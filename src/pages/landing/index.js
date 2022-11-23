import { Button, Divider, Modal } from "antd";
import FullMenu from "../../components/full-menu/full-menu";
import MenuBar from "../../components/menu";
import ContactModal from "components/contact-modal";
import React, { useState } from "react";
import "./style.scss";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <div id="landing">
      <div className="hero">
        <MenuBar landing />
        <div className="ui container">
          <h1>East Asian Seas Regional Node</h1>
          <div className="gpml">
            <span>of the</span>
            <img src="/gpml.svg" alt="GPML" />
          </div>
          <h4>
            The web platform of the Regional Node provides stakeholders in the
            East Asian Seas region with access to knowledge, resources and
            networking services on marine litter and plastic pollution for
            informed action.
          </h4>
          <Button
            type="ghost"
            size="large"
            onClick={() => {
              setModalOpen(true);
            }}
          >{`Read more`}</Button>
        </div>
      </div>
      <div className="menu-section">
        <div className="ui container">
          <FullMenu />
        </div>
      </div>
      <div className="contact-section">
        <div className="ui container">
          <h5>Don’t hesitate to give us feedback or get involved</h5>
          <Button
            size="large"
            onClick={() => {
              setShowContactModal(true);
            }}
          >
            Contact us
          </Button>
        </div>
      </div>
      <div className="supporters-section">
        <div className="ui container">
          <div className="col">
            <a target="_blank" href="http://www.sea-circular.org/">
              <img src="/sea-circular.png" alt="SEA Circular" width={320} />
            </a>
          </div>
          <div className="col">
            <img src="/sweden-sverige.png" alt="Sweden Sverige" width={306} />
          </div>
          <div className="col">
            <a target="_blank" href="https://gpmarinelitter.org/">
              <img
                src="/gpml-colorful.svg"
                alt="GPML"
                style={{ maxWidth: 380 }}
              />
            </a>
          </div>
        </div>
      </div>
      <Modal
        width={600}
        title="ABOUT THE REGIONAL NODE"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={null}
      >
        The East Asian Seas Regional Node of the Global Partnership on Marine
        Litter (GPML) is a regional marine litter knowledge management and
        networking hub of the Coordinating Body on the Seas of East Asia
        (COBSEA). The Regional Node was established by the resumed Twenty-fifth
        Intergovernmental Meeting (IGM 25) of COBSEA in 2022 to support the
        achievement of the COBSEA Regional Action Plan on Marine Litter (RAP
        MALI). The web platform of the Regional Node provides access to marine
        litter knowledge, resources, good practices, data, networks and learning
        in the East Asian Seas region.
        <br />
        <br />
        The Regional Node brings together resources and stakeholders in the
        region to promote evidence-based and collaborative action on marine
        litter and plastic pollution. It provides access to policies,
        frameworks, and knowledge products on marine litter, promotes the
        replication of good practices, bridges science and policy with access to
        a regional research and data, and strengthens learning, capacity
        building and partnerships. In the interim, functions of the Regional
        Node are carried out by the COBSEA Secretariat.
        <br />
        <br />
        The GPML is a multi-stakeholder partnership that provides a global
        cooperation mechanism to prevent marine litter and microplastics, with
        the aim of sharing knowledge and experience and advancing solutions.
        Regional Nodes of the GPML create regional networks to address regional
        knowledge, capacity and networking needs and priorities, leveraging
        engagement across stakeholder groups and building on and providing
        linkages to the global-level framework provided by the GPML. The
        Regional Node is linked to the{" "}
        <a href="https://digital.gpmarinelitter.org/" target="_blank">
          Global Digital Platform of the GPML
        </a>
        .
        <Divider />
        <h3>About COBSEA</h3>
        The Coordinating Body on the Seas of East Asia (COBSEA) is a regional
        intergovernmental mechanism and one of 18 Regional Seas programmes. It
        is the decision-making body for the East Asian Seas Action Plan,
        bringing together nine countries – Cambodia, China, Indonesia, Republic
        of Korea, Malaysia, the Philippines, Thailand, Singapore and Viet Nam –
        in protection and sustainable development of the marine and coastal
        environment. COBSEA focuses on marine pollution, ecosystem-based marine
        and coastal planning and management, and ocean governance. The COBSEA
        Secretariat is hosted by Thailand in Bangkok and administered by the
        UNEP Ecosystems Division in Nairobi.
        <br />
        <br />
        <a href="www.cobsea.org" target="_blank">
          www.cobsea.org
        </a>
      </Modal>

      <ContactModal
        {...{
          showContactModal,
          setShowContactModal,
        }}
      />
    </div>
  );
};

export default Home;
