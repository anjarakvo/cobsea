import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Link,
	Routes,
	withRouter,
	useLocation,
	useHistory,
	NavLink,
} from 'react-router-dom';
import MenuBar from 'components/menu';
import Landing from 'pages/landing';
import KnowledgeLibrary from 'pages/knowledge-library';

function App() {
	return (
		<div className='App'>
			<MenuBar />
			<Routes>
				<Route exact path='/' element={<Landing />} />
				<Route exact path='/knowledge-library' element={<KnowledgeLibrary />} />
			</Routes>
		</div>
	);
}

export default App;
