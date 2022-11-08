import { ReactComponent as MapIcn } from '../../images/map-icn.svg'
import { ReactComponent as DataIcn } from '../../images/data-icn.svg'
import { ReactComponent as FactIcn } from '../../images/fact-icn.svg'
import './styles.scss';
import { Link } from 'react-router-dom';

const View = () => {
  return (
    <div>
			<div id="research-db">
        <nav>
          <div className="cnt">
            <Link to="/research/map">
              <MapIcn /> Map
            </Link>
            <Link to="/research/data">
              <DataIcn /> Data & analytics
            </Link>
            <Link to="/research/fact-sheet">
              <FactIcn /> Fact sheet
            </Link>
          </div>
        </nav>
        <h1>research db</h1>
      </div>
    </div>
  )
}

export default View
