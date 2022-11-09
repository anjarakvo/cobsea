import { NavLink } from 'react-router-dom';

const SubNav = () => {
  return (
    <nav className="subnav">
      <div className="container">
        <NavLink to="/research/data/custom-data-subset">Custom Data Subset</NavLink>
        <NavLink to="/research/data/research-landscape">Research Landscape</NavLink>
        <NavLink to="/research/data/methodology-and-ontology">Methodology & Anthology</NavLink>
        <NavLink to="/research/data/scientific-research"><span>Scientific Research</span></NavLink>
        <NavLink to="/research/data/research-in-humanities">Research in Humanities</NavLink>
        <NavLink to="/research/data/information-for-policy-making">Information for Policy-making</NavLink>
      </div>
    </nav>
  )
}

export default SubNav