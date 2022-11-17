import { Link } from "react-router-dom"

const Footer = () => (
  <div className="footer">
    <div className="ui container">
      <Link to='/' className='logo-a'>
        <img src="/unep.svg" className="unep" alt="UNEP" />
        <img src="/cobsea.svg" alt="COBSEA" />
      </Link>
      <nav>
        <div className="item">About</div>
        <div className="item">Contact</div>
      </nav>
    </div>
  </div>
)

export default Footer