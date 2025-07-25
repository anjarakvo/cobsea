import React, { useEffect, useState } from "react";
import api from "utils/api";
import { resourceTypes } from "./filter-bar";
import ResourceCards from "components/resource-cards";
import { Icon } from "components/svg-icon";
import Maps from "components/map";
import TopicView from "./topic-view";
import { Card, Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Overview = ({
  summaryData,
  box,
  query,
  countData,
  landing,
  data,
  loading,
  history,
  showModal,
  setLoginVisible,
  isAuthenticated,
}) => {
  const allResources = countData
    ?.filter((array) =>
      resourceTypes.some(
        (filter) =>
          array.topic === filter.title && filter.title !== "capacity building"
      )
    )
    ?.reduce(function (acc, obj) {
      return acc + obj.count;
    }, 0);

  if (loading) {
    return (
      <div className="overview">
        <div className="loading">
          <LoadingOutlined spin />
        </div>
      </div>
    );
  }

  const handleClickCategory = (key) => () => {
    history.push({
      pathname: `/knowledge-library/resource/map/${key}`,
    });
  };

  return (
    <div className="overview">
      <ul className="categories">
        <li
          onClick={() => {
            history.push({
              pathname: `/knowledge-library/resource/category`,
            });
          }}
        >
          <div>
            <Icon name={`all`} fill="#000" />
            <b>{allResources}</b>
          </div>
          <span>All Resources</span>
        </li>
        {resourceTypes.map((type) => {
          const itm = countData.find((item) => type.title === item.topic);
          return (
            <li onClick={handleClickCategory(type.key)} key={type.key}>
              <div>
                <Icon name={`resource-types/${type.key}`} fill="#000" />
                <b>{itm != null ? itm?.count : "0"}</b>
              </div>
              <span>{type.label}</span>
            </li>
          );
        })}
      </ul>
      <section className="grey">
        {/* <h3>Categories</h3> */}
        <Featured
          {...{ showModal, setLoginVisible, isAuthenticated, history }}
        />
      </section>
      <section>
        <Row gutter={16}>
          <Col sm={24} md={24} lg={12} xl={12}>
            <h3>Resources by location</h3>
            <div
              className="overlay-btn"
              onClick={() => {
                history.push({
                  pathname: `/knowledge-library/resource/map`,
                });
              }}
            >
              <Maps
                {...{ box, query, countData }}
                data={landing?.map || []}
                isLoaded={() => true}
                useTooltips={false}
                showLegend={false}
                zoom={3}
                path="knowledge"
              />
            </div>
          </Col>
          <Col sm={24} md={24} lg={12} xl={12}>
            <h3>Resources by topic</h3>
            <div
              className="overlay-btn"
              onClick={() => {
                history.push({
                  pathname: `/knowledge-library/resource/topic`,
                });
              }}
            >
              <TopicView
                {...{ query, loading }}
                results={data?.results}
                fetch={true}
                countData={countData.filter(
                  (count) => count.topic !== "gpml_member_entities"
                )}
              />
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

const Featured = ({ showModal, isAuthenticated, setLoginVisible, history }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get("/browse?featured=true&transnational=132").then(({ data }) => {
      setResults(data.results);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <h3>Featured resources</h3>
      <ResourceCards
        items={results}
        showModal={(e) =>
          showModal({
            e,
            type: e.currentTarget.type,
            id: e.currentTarget.id,
          })
        }
        firstCard={
          <Link
            onClick={(e) => {
              e.preventDefault();
              window.open("https://digital.gpmarinelitter.org/flexible-forms");
            }}
          >
            <div className="add-resource-card">
              <b>+</b>
              <span>Share your resource</span>
              <small>Contribute to the library</small>
            </div>
          </Link>
        }
      />
    </>
  );
};

export default Overview;
