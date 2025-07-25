import React, { Fragment, useEffect, useState, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import ResourceCards from 'components/resource-cards';
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import MenuBar from 'components/menu';
import api from '../../utils/api';
import { ReactComponent as SortIcon } from '../../images/knowledge-library/sort-icon.svg';
import { ReactComponent as SearchIcon } from '../../images/search-icon.svg';
import { Button } from 'antd';
import Maps from 'components/map';
import { useQuery, topicNames } from '../../utils/misc';
import TopicView from '../knowledge-library/topic-view';
import { useParams, useLocation } from 'react-router-dom';
import { resourceTopic } from '../knowledge-library/resource-view';
import ResourceCard from 'components/resource-card';

function ResourceView({ history, popularTags, landing, box, showModal }) {
  const query = useQuery();
  const [isAscending, setIsAscending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [countData, setCountData] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [multiCountryCountries, setMultiCountryCountries] = useState([]);
  const [catData, setCatData] = useState([]);
  const [gridItems, setGridItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(false);
  const { type, view } = useParams();
  const { pathname, search } = useLocation();
  const [showFilterModal, setShowFilterModal] = useState(false);

  let headerHeight = useRef(0);
  let footerHeight = useRef(0);

  const limit = 30;
  const totalItems = resourceTopic.reduce(
    (acc, topic) =>
      acc + (countData?.find((it) => it.topic === topic)?.count || 0),
    0
  );

  const uniqueArrayByKey = (array) => [
    ...new Map(array.map((item) => [item['id'], item])).values(),
  ];

  const fetchData = (searchParams) => {
    setLoading(true);
    const queryParams = new URLSearchParams(searchParams);
    if (type || history?.location?.state?.type)
      queryParams.set(
        'topic',
        history?.location?.state?.type
          ? history?.location?.state?.type.replace(/-/g, '_')
          : type.replace(/-/g, '_')
      );

    if (
      type === 'capacity-building' ||
      history?.location?.state?.type === 'capacity-building'
    ) {
      queryParams.set('capacity_building', ['true']);
      queryParams.delete('topic');
    }
    queryParams.set('incCountsForTags', popularTags);
    queryParams.set('limit', limit);
    queryParams.set('transnational', 132);
    queryParams.set('tag', 'case study');

    const url = `/browse?${String(queryParams)}`;
    api
      .get(url)
      .then((resp) => {
        setLoading(false);
        setData(resp?.data);
        setCountData(resp?.data?.counts);
        setGridItems((prevItems) => {
          return uniqueArrayByKey([...prevItems, ...resp?.data?.results]);
        });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const updateQuery = (param, value, reset, fetch = true) => {
    if (!reset) {
      setPageNumber(null);
      setGridItems([]);
    }
    const newQuery = { ...query };
    newQuery[param] = value;

    if (param === 'descending' || query.hasOwnProperty('descending')) {
      newQuery['orderBy'] = 'title';
    }

    if (newQuery.hasOwnProperty('country'))
      setFilterCountries(newQuery.country);

    // Remove empty query
    const arrayOfQuery = Object.entries(newQuery)?.filter(
      (item) => item[1]?.length !== 0 && typeof item[1] !== 'undefined'
    );

    const pureQuery = Object.fromEntries(arrayOfQuery);

    const newParams = new URLSearchParams(pureQuery);

    newParams.delete('offset');

    if (param === 'replace')
      history.replace({
        pathname: pathname,
        search: newParams.toString(),
        state: { type: type },
      });
    else
      history.push({
        pathname: pathname,
        search: newParams.toString(),
        state: { type: type },
      });
    if (fetch && view !== 'category') fetchData(pureQuery);

    if (view === 'category') loadAllCat(pureQuery);

    if (param === 'country') {
      setFilterCountries(value);
    }
  };

  const loadAllCat = async (filter) => {
    setLoading(true);

    const queryParams = new URLSearchParams(filter);
    queryParams.set('transnational', 132);
    queryParams.set('tag', 'case study');
    const promiseArray = resourceTopic.map((url) =>
      api.get(`/browse?topic=${url}&${String(queryParams)}`)
    );

    Promise.all(promiseArray)
      .then((data) => {
        const newData = resourceTopic.map((categories, idx) => ({
          categories,
          data: data[idx].data.results,
          count: data[idx]?.data?.counts[0]?.count || 0,
        }));
        setCatData(newData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useMemo(() => {
    if ((pathname || search) && !loading) updateQuery('replace');
  }, [pathname, search]);

  useEffect(() => {
    if (data.length === 0) updateQuery();
  }, [data, view]);

  const handleCategoryFilter = (key) => {
    history.push({
      pathname: `/knowledge-library/resource/${
        view ? (view === 'category' ? 'grid' : view) : 'map'
      }/${key.replace(/_/g, '-')}/`,
      search: search,
      state: { type: key.replace(/-/g, '_') },
    });
  };

  const sortResults = (ascending) => {
    setPageNumber(null);
    if (!ascending) {
      updateQuery('descending', 'false', true);
    } else {
      updateQuery('descending', 'true', true);
    }
    setIsAscending(ascending);
  };

  useEffect(() => {
    headerHeight.current = document.getElementById('header')?.clientHeight;
    footerHeight.current = document.getElementById('footer')?.clientHeight;
  }, []);

  return (
    <Fragment>
      <div className="list-content">
        <div className="list-toolbar">
          <div className="quick-search">
            <div className="count">
              {view === 'grid'
                ? `Showing ${gridItems?.length} of ${totalItems}`
                : view === 'category'
                ? `${catData?.reduce(
                    (count, current) => count + current?.count,
                    0
                  )}`
                : `Showing ${!loading ? data?.results?.length : ''}`}
            </div>
            <div className="search-icon">
              <SearchIcon />
            </div>
          </div>
          <ViewSwitch {...{ type, view, history }} />
          <button
            className="sort-by-button"
            onClick={() => {
              if (view === 'grid') setGridItems([]);
              sortResults(!isAscending);
            }}
          >
            <SortIcon
              style={{
                transform:
                  !isAscending || isAscending === null
                    ? 'initial'
                    : 'rotate(180deg)',
              }}
            />
            <div className="sort-button-text">
              <span>Sort by:</span>
              <b>{!isAscending ? `A>Z` : 'Z>A'}</b>
            </div>
          </button>
        </div>
        {loading ? (
          <div
            className="loading"
            style={{
              height: `calc(100vh - ${
                headerHeight.current + footerHeight.current
              }px)`,
            }}
          >
            <LoadingOutlined spin />
          </div>
        ) : (data?.results?.length === 0 || data?.length === 0) &&
          catData?.filter((item) => item?.data?.length > 0)?.length === 0 &&
          !loading ? (
          <div
            className="no-result"
            style={{
              height: `calc(100vh - ${(
                headerHeight.current + footerHeight.current
              ).toString()}px)`,
            }}
          >
            <p>No results</p>
          </div>
        ) : (
          <>
            {(view === 'map' || view === 'topic') && (
              <div style={{ position: 'relative' }}>
                <ResourceCards
                  items={data?.results}
                  showMoreCardAfter={20}
                  showMoreCardClick={() => {
                    history.push({
                      pathname: `/knowledge-library/resource/grid/${
                        type ? type : ''
                      }`,
                      search: history.location.search,
                    });
                  }}
                  showModal={(e) =>
                    showModal({
                      e,
                      type: e.currentTarget.type,
                      id: e.currentTarget.id,
                    })
                  }
                />
              </div>
            )}
            {view === 'map' && (
              <Maps
                query={query}
                box={box}
                countData={countData || []}
                isFilteredCountry={filterCountries}
                data={landing?.map || []}
                countryGroupCounts={landing?.countryGroupCounts || []}
                isLoaded={() => true}
                multiCountryCountries={multiCountryCountries}
                useVerticalLegend
                showLegend={true}
                path="knowledge"
              />
            )}
            {view === 'topic' && (
              <div className="topic-view-container">
                <TopicView
                  results={data?.results}
                  fetch={true}
                  loading={loading}
                  countData={countData.filter(
                    (count) => count.topic !== 'gpml_member_entities'
                  )}
                  updateQuery={updateQuery}
                  query={query}
                />
              </div>
            )}
            {view === 'grid' && (
              <GridView
                {...{
                  gridItems,
                  totalItems,
                  limit,
                  loading,
                  setPageNumber,
                  pageNumber,
                  updateQuery,
                  showModal,
                }}
              />
            )}

            {view === 'category' && (
              <div className="cat-view">
                {catData.map((d) => (
                  <Fragment key={d.categories}>
                    {d?.count > 0 && (
                      <>
                        <div className="header-wrapper">
                          <div className="title-wrapper">
                            <h4 className="cat-title">
                              {topicNames(d.categories)}
                            </h4>
                            <div className="quick-search">
                              <div className="count">{d?.count}</div>
                              <div className="search-icon">
                                <SearchIcon />
                              </div>
                            </div>
                          </div>
                          <Button
                            type="link"
                            block
                            onClick={() => {
                              handleCategoryFilter(d.categories);
                            }}
                          >
                            See all {`>`}
                          </Button>
                        </div>
                        <ResourceCards
                          items={d?.data}
                          showMoreCardAfter={20}
                          showMoreCardClick={() => {
                            handleCategoryFilter(d.categories);
                          }}
                          showModal={(e) =>
                            showModal({
                              e,
                              type: e.currentTarget.type,
                              id: e.currentTarget.id,
                            })
                          }
                        />
                      </>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}

const GridView = ({
  gridItems,
  loading,
  updateQuery,
  totalItems,
  limit,
  setPageNumber,
  pageNumber,
  showModal,
}) => {
  return (
    <div className="grid-view">
      <div className="items">
        {gridItems?.map((item, index) => (
          <ResourceCard
            item={item}
            key={item.id * index}
            showModal={(e) =>
              showModal({
                e,
                type: item?.type.replace('_', '-'),
                id: item?.id,
              })
            }
          />
        ))}
      </div>
      {!loading && gridItems?.length < totalItems && (
        <Button
          className="load-more"
          loading={loading}
          onClick={() => {
            setPageNumber((prevNumber) => prevNumber + limit);
            updateQuery('offset', [pageNumber + limit], true);
          }}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

const ViewSwitch = ({ type, view, history }) => {
  const viewOptions = ['map', 'topic', 'grid', 'category'];
  const [visible, setVisible] = useState(false);

  return (
    <div className="view-switch-container">
      <div
        className={classNames('switch-btn', { active: visible })}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <DownOutlined />
        {view} view
      </div>
      <CSSTransition
        in={visible}
        timeout={200}
        unmountOnExit
        classNames="view-switch"
      >
        <div className="view-switch-dropdown">
          <ul>
            {viewOptions
              .filter((opt) => view !== opt)
              .map((viewOption) => (
                <li
                  key={viewOption}
                  onClick={() => {
                    setVisible(!visible);
                    history.push({
                      pathname: `/case-study/${viewOption}/${
                        type && viewOption !== 'category' ? type : ''
                      }`,
                      search: history.location.search,
                    });
                  }}
                >
                  {viewOption} view
                </li>
              ))}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ResourceView;
