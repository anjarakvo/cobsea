import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MenuBar from 'components/menu';
import Landing from 'pages/landing';
import KnowledgeLibrary from 'pages/knowledge-library';
import CapacityBuilding from 'pages/capacity-building';
import api from 'utils/api';
import { UIStore } from './store.js';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import Research from './pages/research';

Promise.all([
	api.get('/tag'),
	api.get('/country'),
	api.get('/country-group'),
	api.get('/organisation'),
	api.get('/non-member-organisation'),
]).then((res) => {
	const [tag, country, countryGroup, organisation, nonMemberOrganisations] =
		res;
	UIStore.update((e) => {
		e.tags = tag.data;
		e.countries = uniqBy(country.data).sort((a, b) =>
			a.name.localeCompare(b.name),
		);
		e.regionOptions = countryGroup.data.filter((x) => x.type === 'region');
		e.meaOptions = countryGroup.data.filter((x) => x.type === 'mea');
		e.transnationalOptions = countryGroup.data.filter(
			(x) => x.type === 'transnational',
		);
		e.organisations = uniqBy(sortBy(organisation.data, ['name'])).sort((a, b) =>
			a.name.localeCompare(b.name),
		);
		e.nonMemberOrganisations = uniqBy(
			sortBy(nonMemberOrganisations.data, ['name']),
		).sort((a, b) => a.name.localeCompare(b.name));
	});
});

function App() {
	return (
		<div className='App'>
			<MenuBar />
			<Switch>
				<Route path='/' exact render={(props) => <Landing />} />
				<Route
					path='/knowledge-library'
					render={(props) => <KnowledgeLibrary />}
				/>
				<Route
					path='/capacity-building/:view?/:type?'
					render={(props) => <CapacityBuilding />}
				/>
				<Route path='/research' component={Research} />
			</Switch>
		</div>
	);
}

export default App;
