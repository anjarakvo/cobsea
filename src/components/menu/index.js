import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import logo from 'images/gpml.svg';

const MenuBar = () => {
	return (
		<>
			<Layout.Header className='nav-header-container'>
				<div className='ui container'>
					<Link to='/' className='logo-a'>
						<img src={logo} className='logo' alt='GPML' />
					</Link>
				</div>
			</Layout.Header>
		</>
	);
};

export default MenuBar;
