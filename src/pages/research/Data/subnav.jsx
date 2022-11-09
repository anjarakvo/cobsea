import { Link } from 'react-router-dom';

const SubNav = () => {
  return (
    <nav className="subnav">
      <div className="container">
        <Link to="/research/data/custom-data-subset">Custom Data Subset</Link>
        <Link to="/research/data/research-landscape">Research Landscape</Link>
        <Link to="/research/data/methodology-and-ontology">Methodology & Anthology</Link>
        <Link to="/research/data/scientific-research"><span>Scientific Research</span></Link>
        <Link to="/research/data/research-in-humanities">Research in Humanities</Link>
        <Link to="/research/data/information-for-policy-making">Information for Policy-making</Link>
      </div>
    </nav>
  )
}

export default SubNav