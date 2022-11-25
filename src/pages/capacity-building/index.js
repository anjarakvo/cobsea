import React, { useEffect, useState, useRef } from 'react';
import '../knowledge-library/style.scss';
import api from 'utils/api';
import ResourceView from './resource-view';
import { UIStore } from '../../store';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import bodyScrollLock from 'utils/scroll-utils';
import DetailModal from 'pages/detail/modal';

const popularTags = [
	'plastics',
	'waste management',
	'marine litter',
	'capacity building',
	'product by design',
	'source to sea',
];

const resourceList = [
	{
		title: 'Workshops / Trainings (in-person)',
		ids: [
			10074, 10065, 10063, 10064, 10060, 10157, 10155, 10154, 10128, 10127,
			10126, 30, 10043, 22, 10103, 10081, 10082, 33, 36, 28, 10056, 10022, 19,
			18, 10071, 4,
		],
	},
	{
		title: 'Webinars & Recordings (online events)',
		ids: [
			10156, 10105, 10039, 10026, 10059, 9, 10067, 10047, 10028, 10100, 3,
			10122, 10114, 10116, 10113, 10110, 10109, 10104, 10080, 10083, 10077,
			10079, 10041, 10049, 10040, 10036, 10025, 23, 10014, 10012, 10010, 10011,
			10007, 10006, 10058, 10093, 10094, 10085, 10097, 10057, 10034, 10091,
			10076, 10090, 8, 31, 10, 10095, 10096,
		],
	},
	{
		title: 'E-Learning Courses',
		ids: [10031, 10668, 10197, 149],
	},
];

function CapacityBuilding({ setLoginVisible, isAuthenticated }) {
	const history = useHistory();
	const box = document.getElementsByClassName('knowledge-lib');
	const [params, setParams] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const { landing } = UIStore.useState((s) => ({
		landing: s.landing,
	}));

	const hideModal = () => {
		console.log(history);
		setModalVisible(false);
		const previousHref = `${history?.location?.pathname}${history?.location?.search}`;
		window.history.pushState(
			{ urlPath: `/${previousHref}` },
			'',
			`${previousHref}`,
		);
	};

	const showModal = ({ e, type, id }) => {
		e.preventDefault();
		if (type && id) {
			const detailUrl = `/${type}/${id}`;
			e.preventDefault();
			setParams({ type, id });
			window.history.pushState(
				{ urlPath: `/${detailUrl}` },
				'',
				`${detailUrl}`,
			);
			setModalVisible(true);
			bodyScrollLock.enable();
		}
	};

	useEffect(() => {
		api.get(`/landing?entityGroup=topic`).then((resp) => {
			UIStore.update((e) => {
				e.landing = resp.data;
			});
		});
	}, []);

	return (
		<div id='knowledge-lib'>
			<Switch>
				<Route exact path='/capacity-building'>
					<Redirect to='/capacity-building/category' exact={true} />
				</Route>
				<Route
					path='/capacity-building/:view?/:type?'
					render={(props) => (
						<ResourceView
							{...{ box, history, popularTags, landing, showModal }}
						/>
					)}
				/>
			</Switch>
			<DetailModal
				match={{ params }}
				visible={modalVisible}
				setVisible={() => hideModal()}
				{...{
					setLoginVisible,
					isAuthenticated,
				}}
			/>
		</div>
	);
}

export default CapacityBuilding;
