import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="footer" id="footer">
    <div className="ui container">
      <Link to="/" className="logo-a">
        <img src="/unep.svg" className="unep" alt="UNEP" />
        <img src="/cobsea.svg" alt="COBSEA" />
      </Link>
      <nav>
        <div className="item">
          <Link to="/about-us">About</Link>
        </div>
        <div className="item">
          <Link to="/contact-us">Contact</Link>
        </div>
      </nav>
    </div>
  </div>
);

export default Footer;
