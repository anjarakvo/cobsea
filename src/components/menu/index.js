import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import classNames from 'classnames'
import './style.scss'

const MenuBar = ({ landing }) => {
	return (
		<>
			<header className={classNames('nav-header', { 'at-landing': landing })}>
				<div className='ui container'>
					<Link to='/' className='logo-a'>
						<img src="/unep.svg" className="unep" alt="UNEP" />
            <img src="/cobsea.svg" alt="COBSEA" />
					</Link>
          <nav>
            <Link to='/knowledge-library'>Knowledge library</Link>
            &nbsp;|&nbsp;
            <Link to="/research">Research database</Link>
          </nav>
				</div>
			</header>
		</>
	);
};

export default MenuBar;
