/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import './styles.scss';
import {
  Row,
  Col,
  List,
  Popover,
  Tag,
  Modal,
  notification,
  Skeleton,
} from 'antd';

import {
  InfoCircleOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import api from 'utils/api';
import { UIStore } from '../../store';
import { titleCase } from 'utils/string';
import LeftImage from '../../images/sea-dark.jpg';
import { useHistory, useLocation } from 'react-router-dom';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';
import { detailMaps } from './mapping';
import moment from 'moment';
import { resourceTypeToTopicType } from 'utils/misc';
import { multicountryGroups } from 'components/select/multicountry';
import ResourceCards from 'components/resource-cards';
import Header from './header';
import StakeholderCarousel from './stakeholder-carousel';
import { ReactComponent as LocationImage } from '../../images/location.svg';
import { ReactComponent as TransnationalImage } from '../../images/transnational.svg';
import { ReactComponent as CityImage } from '../../images/city-icn.svg';
import { lifecycleStageTags } from 'utils/misc';

const currencyFormat = (curr) => Intl.NumberFormat().format(curr);

const renderGeoCoverageCountryGroups = (data, countries) => {
  let dataCountries = null;
  const subItems = [].concat(
    ...multicountryGroups.map(({ item }) => item || [])
  );
  const newArray = [...new Set([...subItems, ...countries])];
  dataCountries = data['geoCoverageCountryGroups']?.map((x) => {
    return {
      name: newArray.find((it) => it.id === x)?.name,
      countries: newArray.find((it) => it.id === x)?.countries
        ? newArray.find((it) => it.id === x)?.countries
        : [],
    };
  });
  return (
    <>
      {dataCountries.map((item, index) => (
        <span id={index}>
          {(index ? ', ' : ' ') + item.name}{' '}
          {item.countries && item.countries.length > 0 && (
            <Popover
              overlayClassName="popover-multi-country"
              title={''}
              content={
                <ul className="list-country-group">
                  {item.countries.map((name) => (
                    <li id={name.id}>{name.name}</li>
                  ))}
                </ul>
              }
              placement="right"
              arrowPointAtCenter
            >
              <InfoCircleOutlined />
            </Popover>
          )}
        </span>
      ))}
    </>
  );
};
const renderCountries = (data, countries) => {
  let dataCountries = null;
  const newArray = [...new Set([...countries])];
  dataCountries = data['geoCoverageCountries']
    ?.map((x) => newArray.find((it) => it.id === x)?.name)
    .join(', ');
  return dataCountries;
};

const DetailsView = ({
  match: { params },
  setLoginVisible,
  setFilterMenu,
  isAuthenticated,
}) => {
  const [showLess, setShowLess] = useState(true);

  const { profile, countries, languages, transnationalOptions, placeholder } =
    UIStore.useState((s) => ({
      profile: s.profile,
      countries: s.countries,
      languages: s.languages,
      transnationalOptions: s.transnationalOptions,
      icons: s.icons,
      placeholder: s.placeholder,
    }));
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [relations, setRelations] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState('');
  const [editComment, setEditComment] = useState('');
  const [translations, setTranslations] = useState({});
  const [selectedLanguage, setLanguage] = useState('');

  const relation = relations.find(
    (it) =>
      it.topicId === parseInt(params.id) &&
      it.topic === resourceTypeToTopicType(params.type.replace('-', '_'))
  );

  const isConnectStakeholders = ['organisation', 'stakeholder'].includes(
    params?.type
  );

  const allowBookmark =
    params.type !== 'stakeholder' || profile.id !== params.id;

  const handleRelationChange = (relation) => {
    if (!isAuthenticated) {
      setLoginVisible(true);
    }

    if (isAuthenticated && profile.reviewStatus === undefined) {
      setLoginVisible(true);
    }
    if (profile.reviewStatus === 'APPROVED') {
      api.post('/favorite', relation).then((res) => {
        const relationIndex = relations.findIndex(
          (it) => it.topicId === relation.topicId
        );
        if (relationIndex !== -1) {
          setRelations([
            ...relations.slice(0, relationIndex),
            relation,
            ...relations.slice(relationIndex + 1),
          ]);
        } else {
          setRelations([...relations, relation]);
        }
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    params?.type &&
      params?.id &&
      api
        .get(`/detail/${params?.type.replace('-', '_')}/${params?.id}`)
        .then((d) => {
          setData(d.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    UIStore.update((e) => {
      e.disclaimer = null;
    });
    window.scrollTo({ top: 0 });
  }, [profile, location]);

  const handleEditBtn = () => {
    let form = null;
    let type = null;
    let link = null;
    switch (params.type) {
      case 'initiative':
        form = 'initiative';
        link = 'edit-initiative';
        type = 'initiative';
        break;
      case 'action-plan':
        form = 'actionPlan';
        link = 'edit-action-plan';
        type = 'action_plan';
        break;
      case 'policy':
        form = 'policy';
        link = 'edit-policy';
        type = 'policy';
        break;
      case 'technical-resource':
        form = 'technicalResource';
        link = 'edit-technical-resource';
        type = 'technical_resource';
        break;
      case 'financing-resource':
        form = 'financingResource';
        link = 'edit-financing-resource';
        type = 'financing_resource';
        break;
      case 'technology':
        form = 'technology';
        link = 'edit-technology';
        type = 'technology';
        break;
      case 'event':
        form = 'event';
        link = 'edit-event';
        type = 'event';
        break;
      default:
        form = 'entity';
        link = 'edit-entity';
        type = 'initiative';
        break;
    }
    UIStore.update((e) => {
      e.formEdit = {
        ...e.formEdit,
        flexible: {
          status: 'edit',
          id: params.id,
        },
      };
      e.formStep = {
        ...e.formStep,
        flexible: 1,
      };
    });

    history.push({
      pathname: `/${link}/${params.id}`,
      state: { type: type },
    });
  };

  const handleDeleteBtn = () => {
    Modal.error({
      className: 'popup-delete',
      centered: true,
      closable: true,
      icon: <DeleteOutlined />,
      title: 'Are you sure you want to delete this resource?',
      content: 'Please be aware this action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        return api
          .delete(`/detail/${params?.type.replace('-', '_')}/${params?.id}`)
          .then((res) => {
            notification.success({
              message: 'Resource deleted successfully',
            });
          })
          .catch((err) => {
            console.error(err);
            notification.error({
              message: 'Oops, something went wrong',
            });
          });
      },
    });
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState('');

  const description = data?.description ? data?.description : data?.summary;

  const entityConnections = data?.entityConnections?.map((entity) => {
    return {
      ...entity,
      name: entity?.entity,
      country: entity?.country || null,
      id: entity?.entityId,
      image: entity?.image,
      type: 'entity',
      role: entity?.role,
    };
  });

  const tagsToShow =
    data?.tags && data?.tags?.length > 0
      ? data.tags.filter(
          (item) =>
            !lifecycleStageTags.some(
              (filterItem) =>
                filterItem.toLowerCase() === item.tag.toLowerCase()
            )
        )
      : [];
  const lifecycleTagsToShow =
    data?.tags && data?.tags?.length > 0
      ? data.tags.filter((item) =>
          lifecycleStageTags.some(
            (filterItem) => filterItem.toLowerCase() === item.tag.toLowerCase()
          )
        )
      : [];

  const stakeholderConnections = data?.stakeholderConnections
    ?.filter(
      (it, ind) =>
        data.stakeholderConnections.findIndex(
          (_it) => _it.stakeholderId === it.stakeholderId
        ) === ind
    ) // filter out diplicates
    .sort((a, b) => {
      if (a?.role?.toLowerCase() === 'owner') {
        return -1;
      }
    })
    .map((stakeholder) => {
      return {
        ...stakeholder,
        name: stakeholder?.stakeholder,
      };
    });

  return (
    <div className="detail-view-wrapper">
      <div className="detail-view">
        <Header
          {...{
            data,
            LeftImage,
            profile,
            isAuthenticated,
            params,
            handleEditBtn,
            handleDeleteBtn,
            allowBookmark,
            visible,
            handleVisible,
            showLess,
            setShowLess,
            placeholder,
            handleRelationChange,
            relation,
            translations,
            selectedLanguage,
            setLanguage,
          }}
        />
        {loading && (
          <Row
            style={{ margin: '20px 40px' }}
            gutter={{
              lg: 24,
            }}
          >
            <Skeleton
              paragraph={{
                rows: 7,
              }}
              active
            />
          </Row>
        )}

        {!loading && (
          <Row
            className="resource-info "
            gutter={{
              lg: 24,
            }}
          >
            {data?.image && (
              <a
                className="resource-image-wrapper"
                href={`${
                  data?.url && data?.url?.includes('https://')
                    ? data?.url
                    : data.languages
                    ? data?.languages[0].url
                    : data?.url?.includes('http://')
                    ? data?.url
                    : 'https://' + data?.url
                }`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="resource-image"
                  id="detail-resource-image"
                  src={
                    data?.image.startsWith('/image')
                      ? `https://digital.gpmarinelitter.org${data.image}`
                      : data?.image
                  }
                  alt={data?.title}
                />
              </a>
            )}

            <Col className="details-content-wrapper section-description section">
              {description && (
                <Row>
                  <h3 className="content-heading">Description</h3>
                  <p className="content-paragraph">
                    {selectedLanguage
                      ? translations?.summary[selectedLanguage]
                      : description}
                  </p>
                </Row>
              )}

              <Row>
                {data?.geoCoverageType && (
                  <Col className="section-geo-coverage">
                    <div className="extra-wrapper">
                      <h3 className="content-heading">
                        Location & Geocoverage
                      </h3>
                      <div
                        style={{
                          marginBottom: data?.geoCoverageType === 'global' && 0,
                        }}
                        className="detail-item geocoverage-item"
                      >
                        <div className="transnational-icon detail-item-icon">
                          <TransnationalImage />
                        </div>
                        <span>{titleCase(data?.geoCoverageType || '')}</span>
                      </div>

                      {data?.geoCoverageType !== 'global' && (
                        <>
                          {data?.geoCoverageType !== 'sub-national' &&
                            data?.geoCoverageType !== 'national' &&
                            data?.geoCoverageCountryGroups?.length > 0 &&
                            renderGeoCoverageCountryGroups(
                              data,
                              countries,
                              transnationalOptions
                            ) && (
                              <div className="detail-item">
                                <Row>
                                  <div className="location-icon detail-item-icon">
                                    <LocationImage />
                                  </div>
                                  <div>
                                    {renderGeoCoverageCountryGroups(
                                      data,
                                      countries,
                                      transnationalOptions
                                    )}
                                    {renderCountries(
                                      data,
                                      countries,
                                      transnationalOptions
                                    ) &&
                                      ', ' +
                                        renderCountries(
                                          data,
                                          countries,
                                          transnationalOptions
                                        )}
                                  </div>
                                </Row>
                              </div>
                            )}

                          {(data?.geoCoverageType === 'sub-national' ||
                            data?.geoCoverageType === 'national') &&
                            data?.geoCoverageValues &&
                            data?.geoCoverageValues.length > 0 &&
                            renderCountries(
                              data,
                              countries,
                              transnationalOptions
                            ) && (
                              <div className="detail-item">
                                <Row>
                                  <div className="location-icon detail-item-icon">
                                    <LocationImage />
                                  </div>
                                  <div>
                                    {renderCountries(
                                      data,
                                      countries,
                                      transnationalOptions
                                    )}
                                  </div>
                                </Row>
                              </div>
                            )}

                          {(data?.subnationalCity ||
                            data?.q24SubnationalCity) && (
                            <div className="detail-item">
                              <Row>
                                <div className="city-icon detail-item-icon">
                                  <CityImage />
                                </div>
                                <div>
                                  {data?.subnationalCity
                                    ? data?.subnationalCity
                                    : data?.q24SubnationalCity}
                                </div>
                              </Row>
                            </div>
                          )}
                        </>
                      )}

                      {data?.languages && (
                        <span className="detail-item">
                          {data?.languages
                            .map((language) => {
                              const langs =
                                !isEmpty(languages) &&
                                languages[language?.isoCode]?.name;
                              return langs || '';
                            })
                            .join(', ')}
                        </span>
                      )}
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        )}

        {lifecycleTagsToShow?.length > 0 && (
          <Col className="section-tag section">
            <div className="extra-wrapper">
              <h3 className="content-heading">Life Cycle Stage</h3>
              <List itemLayout="horizontal">
                <List.Item>
                  <List.Item.Meta
                    title={
                      <ul className="tag-list">
                        {lifecycleTagsToShow.map((tag) => (
                          <li className="tag-list-item" key={tag?.tag}>
                            <div className="label">
                              <span>{tag?.tag || ''}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    }
                  />
                </List.Item>
              </List>
            </div>
          </Col>
        )}

        {/* TAGS */}
        {tagsToShow?.length > 0 && (
          <Col className="section-tag section">
            <div className="extra-wrapper">
              <h3 className="content-heading">Tags</h3>
              <List itemLayout="horizontal">
                <List.Item>
                  <List.Item.Meta
                    title={
                      <ul className="tag-list">
                        {tagsToShow?.map((tag) => (
                          <li className="tag-list-item" key={tag?.tag}>
                            <div className="label">
                              <span>{tag?.tag || ''}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    }
                  />
                </List.Item>
              </List>
            </div>
          </Col>
        )}

        {/* CONNECTION */}
        {(data?.entityConnections?.length > 0 ||
          data?.stakeholderConnections?.filter(
            (x) => x.stakeholderRole !== 'ADMIN' || x.role === 'interested in'
          )?.length > 0) && (
          <Col className="section section-connection-stakeholder">
            <div className="extra-wrapper">
              <h3 className="content-heading">Connections</h3>

              <StakeholderCarousel
                stakeholders={[...entityConnections, ...stakeholderConnections]}
              />
            </div>
          </Col>
        )}

        {/* DOCUMENTS AND INFO */}
        {data?.infoDocs && (
          <Col className="section section-document">
            <div className="extra-wrapper">
              <h3 className="content-heading">Documents and info</h3>
              <div className="content-paragraph">
                <div
                  className="list documents-list"
                  dangerouslySetInnerHTML={{
                    __html: selectedLanguage
                      ? translations?.infoDocs[selectedLanguage]
                      : data?.infoDocs,
                  }}
                />
              </div>
            </div>
          </Col>
        )}

        {data != null && !loading && (
          <Records
            {...{ countries, languages, data, profile }}
            type={params.type}
          />
        )}
        {/* RELATED CONTENT */}

        {data?.relatedContent &&
          data?.relatedContent?.length > 0 &&
          data?.relatedContent.length > 0 && (
            <Col className="section section-related-content">
              <div className="resource-cards-wrapper">
                <h3 className="related-content-title">Related content</h3>
                <div className="related-content-container">
                  <ResourceCards
                    items={data?.relatedContent}
                    showMoreCardAfter={20}
                    showMoreCardHref={'/knowledge/library'}
                  />
                </div>
              </div>
            </Col>
          )}
      </div>
    </div>
  );
};

const Records = ({ countries, languages, type, data }) => {
  console.log('Records', type, data);
  const mapping = detailMaps[type.replace('-', '_')];
  if (!mapping) {
    return;
  }
  const renderRow = (item, index) => {
    const {
      key,
      name,
      value,
      type,
      customValue,
      arrayCustomValue,
      currencyObject,
    } = item;

    const displayEntry =
      data?.[key] ||
      data?.[key] === false ||
      data?.[key] === true ||
      data?.[key] === 0 ||
      key === null;
    const [currency, amount, remarks] =
      arrayCustomValue?.map((it) => data?.[it]) || [];

    const customCurrency =
      value === 'custom' &&
      type === 'currency' &&
      (remarks
        ? currency
          ? `${currency} ${currencyFormat(amount)} - ${remarks}`
          : `${currencyFormat(amount)} - ${remarks}`
        : currency
        ? `${currency} ${currencyFormat(amount)}`
        : `${amount}`);

    if (
      (key === 'lifecyclePhase' && data[key]?.length === 0) ||
      (key === 'sector' && data[key]?.length === 0) ||
      (key === 'focusArea' && data[key]?.length === 0)
    ) {
      return false;
    }

    if (key === 'status' && data[value] !== 'In force') {
      return null;
    }

    return (
      <Fragment key={`${type}-${name}`}>
        {displayEntry && (
          <div key={name + index} className="record-row">
            <div className="record-name">{name}</div>
            <div className="record-value">
              {key === null && type === 'static' && value}
              {value === key && type === 'name' && data[key] === false && 'No'}
              {value === key && type === 'name' && data[key] === true && 'Yes'}
              {value === key &&
                (type === 'name' ||
                  type === 'string' ||
                  type === 'number' ||
                  type === 'object') &&
                (data[value].name || data[value])}
              {currencyObject && data[currencyObject.name]
                ? `${data[currencyObject.name]?.[0]?.name?.toUpperCase()} `
                : ''}
              {value === key &&
                type === 'currency' &&
                currencyFormat(data[value])}
              {value === key &&
                type === 'date' &&
                data[key] !== 'Ongoing' &&
                moment(data[key]).format('DD MMM YYYY')}
              {value === key &&
                type === 'date' &&
                data[key] === 'Ongoing' &&
                data[key]}
              {value === key &&
                type === 'array' &&
                data[key].map((x) => x.name).join(', ')}
              {value === key &&
                type === 'country' &&
                countries.find((it) => it.id === data[key]).name}
              {value === 'custom' &&
                type === 'object' &&
                data[key][customValue]}
              {value === 'custom' &&
                type === 'startDate' &&
                moment.utc(data[arrayCustomValue[0]]).format('DD MMM YYYY')}
              {value === 'custom' &&
                type === 'endDate' &&
                moment.utc(data[arrayCustomValue[0]]).format('DD MMM YYYY')}

              {data[key] &&
                value === 'isoCode' &&
                type === 'array' &&
                uniqBy(data[key], 'isoCode')
                  .map((x, i) => languages[x.isoCode].name)
                  .join(', ')}
              {key === 'tags' &&
                data[key] &&
                value === 'join' &&
                type === 'array' &&
                data[key].map((tag) => Object.values(tag)[0]).join(', ')}
              {key !== 'tags' &&
                type === 'initiative' &&
                data[key] &&
                value === 'join' &&
                type === 'array' &&
                data[key]?.length !== 0 &&
                data[key]?.map((x) => x.name).join(', ')}
              {key !== 'tags' &&
                type !== 'initiative' &&
                data[key] &&
                value === 'join' &&
                type === 'array' &&
                data[key].join(', ')}
              {type === 'initiative' &&
                value === 'custom' &&
                type === 'array' &&
                data[key][customValue] &&
                data[key][customValue]?.map((x) => x.name).join(', ')}
              {type !== 'initiative' &&
                value === 'custom' &&
                type === 'array' &&
                data[key][customValue] &&
                data[key][customValue].join(', ')}

              {customCurrency}
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <Col className="record-section section">
      <h3 className="content-heading">Records</h3>
      <div>
        <div className="record-table">
          <div>{countries && mapping.map(renderRow)}</div>
        </div>
      </div>
    </Col>
  );
};

export default DetailsView;
