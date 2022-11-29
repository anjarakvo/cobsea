import React, { useState } from "react";
import "./styles.scss";
import { Row, Col, Button, Card, Avatar } from "antd";
import {ReactComponent as LocPin} from '../../images/loc-pin.svg'
import {ReactComponent as Contact} from '../../images/contact.svg'
import ContactModal from "components/contact-modal";
import data from './data.json'

function ResearchNetwork() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div>
      <div id="research-network">
        <div className="header">
          <div className="ui container">
            <Row>
              <Col sm={12} md={12} lg={18} xl={18}>
                <div>
                  <h3>
                    What is the Regional Research Network of the Regional Node?
                  </h3>
                  <p>
                    A network of research scientists from research institutions in the East Asian Seas Region that come together to share findings on marine litter and plastic pollution research and develop a regional understanding of knowledge and gaps. The network is interdisciplinary and aims to catalyse collaborative research to inform policy-priorities with science-based information and address knowledge needs.  
                  </p>
                </div>
              </Col>
              <Col sm={12} md={12} lg={6} xl={6}>
                <div className="call-to-action">
                  <h3>Are you a researcher?</h3>
                  <Button
                    key="submit"
                    type="primary"
                    className="action-button"
                    onClick={() => setShowContactModal(true)}
                  >
                    Get in touch
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="profile-section">
          <div className="ui container">
            <Row gutter={16}>
              {data.map(item =>
              <Col sm={24} md={12} lg={12} xl={12}>
                <Card className="profile-details">
                  <Row type="flex">
                    <h4>{item.Institution}</h4>
                    <div className="loc meta">
                      <LocPin /><span>{item['Sub-national']} {item.Country}</span>
                    </div>
                    <p>{item['Area of expertise']}</p>
                    <div className="contact meta">
                      <Contact /><span>{item.Name}</span><span className="dot">&#183;</span><a href={`mailto:${item.Contact}`}><Button type="link" size="small">Get in touch</Button></a>
                    </div>
                  </Row>
                </Card>
              </Col>
              )}
            </Row>
          </div>
        </div>
      </div>
      <ContactModal
        {...{
          showContactModal,
          setShowContactModal,
        }}
      />
    </div>
  );
}

export default ResearchNetwork;
