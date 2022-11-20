import React, { useEffect, useState, useRef } from "react";
import "../knowledge-library/style.scss";
import api from "utils/api";
import ResourceView from "./resource-view";
import { UIStore } from "../../store";
import {
  useHistory,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import bodyScrollLock from "utils/scroll-utils";
import DetailModal from "pages/detail/modal";
import MenuBar from "components/menu";

const popularTags = [
  "plastics",
  "waste management",
  "marine litter",
  "capacity building",
  "product by design",
  "source to sea",
];

function CapacityBuilding({ setLoginVisible, isAuthenticated }) {
  const history = useHistory();
  const box = document.getElementsByClassName("knowledge-lib");
  const [params, setParams] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { landing } = UIStore.useState((s) => ({
    landing: s.landing,
  }));

  const hideModal = () => {
    console.log(history);
    setModalVisible(false);
    const previousHref = `${history?.location?.pathname}${history?.location?.search}`;
    window.history.pushState(
      { urlPath: `/${previousHref}` },
      "",
      `${previousHref}`
    );
  };

  const showModal = ({ e, type, id }) => {
    e.preventDefault();
    if (type && id) {
      const detailUrl = `/${type}/${id}`;
      e.preventDefault();
      setParams({ type, id });
      window.history.pushState(
        { urlPath: `/${detailUrl}` },
        "",
        `${detailUrl}`
      );
      setModalVisible(true);
      bodyScrollLock.enable();
    }
  };

  useEffect(() => {
    api.get(`/landing?entityGroup=topic`).then((resp) => {
      UIStore.update((e) => {
        e.landing = resp.data;
      });
    });
  }, []);

  return (
    <div id="knowledge-lib">
    <MenuBar />
      <Switch>
        <Route exact path="/capacity-building">
          <Redirect to="/capacity-building/category" exact={true} />
        </Route>
        <Route
          path="/capacity-building/:view?/:type?"
          render={(props) => (
            <ResourceView
              {...{ box, history, popularTags, landing, showModal }}
            />
          )}
        />
      </Switch>
      <DetailModal
        match={{ params }}
        visible={modalVisible}
        setVisible={() => hideModal()}
        {...{
          setLoginVisible,
          isAuthenticated,
        }}
      />
    </div>
  );
}

export default CapacityBuilding;
