import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import logo from 'images/gpml.svg';
import './style.scss'

const MenuBar = () => {
	return (
		<>
			<header className='nav-header'>
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
