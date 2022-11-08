import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MenuBar from 'components/menu';
import Landing from 'pages/landing';
import KnowledgeLibrary from 'pages/knowledge-library';

function App() {
	return (
		<div className='App'>
			<MenuBar />
			<Switch>
				<Route path='/' exact render={(props) => <Landing />} />
				<Route
					path='/knowledge-library'
					exact
					render={(props) => <KnowledgeLibrary />}
				/>
			</Switch>
		</div>
	);
}

export default App;
