import { Link } from "react-router-dom";
import { ReactComponent as LibIcn } from "../../images/lib-icn.svg";
import { ReactComponent as CaseStudyIcn } from "../../images/casestudy-icn.svg";
import { ReactComponent as ChartSvg } from "../../images/chart-icn.svg";
import { ReactComponent as NetworkSvg } from "../../images/network-icn.svg";
import { ReactComponent as LearnSvg } from "../../images/learn-icn.svg";
import { ReactComponent as EventsSvg } from "../../images/events-icn.svg";
import "./style.scss";

const FullMenu = () => (
  <div className="full-menu">
    <div className="col">
      <h3>Marine litter policy and management</h3>
      <Item
        to="/knowledge-library"
        title="Knowledge library"
        subtitle="National & regional policies and initiatives"
        icon={<LibIcn />}
      />
      <Item
        to="/case-study"
        title="Case studies"
        subtitle="A map of good practices"
        icon={<CaseStudyIcn />}
      />
    </div>
    <div className="col">
      <h3>Marine litter science</h3>
      <Item
        to="/research/map"
        title="research database"
        subtitle="Datasets on plastic pollution and marine litter"
        icon={<ChartSvg />}
      />
      <Item
        to="/research-network"
        title="RESEARCH NETWORK"
        subtitle="Directory of organisations"
        icon={<NetworkSvg />}
      />
    </div>
    <div className="col">
      <h3>MARINE LITTER CAPACITY BUILDING</h3>
      <Item
        to="/capacity-building"
        title="LEARNING CENTER"
        subtitle="Learning and capacity building resources"
        icon={<LearnSvg />}
      />
      <Item
        to="/"
        title="EVENTS"
        subtitle="Upcoming sector events"
        icon={<EventsSvg />}
      />
    </div>
  </div>
);

const Item = ({ to, title, subtitle, icon }) => (
  <Link to={to} className="item">
    <div className="icon">{icon}</div>
    <h4>{title}</h4>
    <h5>{subtitle}</h5>
    <div>
      <b>{`Explore >`}</b>
    </div>
  </Link>
);

export default FullMenu;
