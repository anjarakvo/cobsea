import React, { useEffect, useState } from 'react';
import moment from 'moment';
import api from '../../utils/api';
import './styles.scss';
import { Avatar, Card } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { TrimText } from 'utils/string';
import DetailModal from 'pages/detail/modal';
import bodyScrollLock from 'utils/scroll-utils';
import { LoadingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const popularTags = [
	'plastics',
	'waste management',
	'marine litter',
	'capacity building',
	'product by design',
	'source to sea',
];

function Events({ setLoginVisible, isAuthenticated }) {
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [gridItems, setGridItems] = useState([]);
	const [params, setParams] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const limit = 30;

	const uniqueArrayByKey = (array) => [
		...new Map(array.map((item) => [item['id'], item])).values(),
	];

	const sortArrayByDate = (items) => {
		let uniqueYearMonths = [
			...new Set(items.map((x) => x.startDate.substring(0, 7))),
		];
		let results = [
			...new Set(items.map((x) => x.startDate.substring(0, 4))),
		].map((year) => ({
			year: year,
			months: uniqueYearMonths
				.filter((ym) => ym.startsWith(year))
				.map((ym) => ({
					month: moment(ym).format('MMMM'),
					items: items
						.filter((item) => item.startDate.startsWith(ym))
						.map((item) => ({
							id: item.id,
							title: item.title,
							startDate: item.startDate,
							endDate: item.endDate,
							description: item.description,
							image: item.image,
							type: item.type,
						})),
				})),
		}));

		return results;
	};

	const fetchData = (searchParams) => {
		setLoading(true);
		const queryParams = new URLSearchParams(searchParams);
		queryParams.set('topic', 'event');
		queryParams.set('incCountsForTags', popularTags);
		queryParams.set('limit', limit);
		queryParams.set('transnational', 132);

		const url = `/browse?${String(queryParams)}`;
		api
			.get(url)
			.then((resp) => {
				setLoading(false);
				setGridItems((prevItems) => {
					return uniqueArrayByKey([...prevItems, ...resp?.data?.results]);
				});
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	};

	useEffect(() => {
		if (gridItems.length === 0) fetchData();
	}, [gridItems]);

	const hideModal = () => {
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

	if (loading) {
		return (
			<div className='overview'>
				<div className='loading'>
					<LoadingOutlined spin />
				</div>
			</div>
		);
	}

	return (
		<div id='events'>
			<div className='ui container'>
				{sortArrayByDate(gridItems)?.map((item) => (
					<div className='year' key={item.year}>
						<h3>{item.year}</h3>
						{item?.months?.map((item) => (
							<div className='month'>
								<h4>{item.month}</h4>
								{item.items.map((item) => (
									<Card>
										<Meta
											avatar={
												<Avatar
													src={
														item.image.startsWith('/image')
															? `https://digital.gpmarinelitter.org${item.image}`
															: item.image
													}
												/>
											}
											title={item.title}
											description={
												<>
													<div className='date'>
														{moment(item.startDate).format('DD MMM')} -{' '}
														{moment(item.endDate).format('DD MMM')}
													</div>
													<p>
														{TrimText({ text: item.description, max: 300 })}
													</p>
													<p
														className='read-more'
														onClick={(e) =>
															showModal({
																e,
																type: item.type,
																id: item.id,
															})
														}
													>
														Read more {`>`}
													</p>
												</>
											}
										/>
									</Card>
								))}
							</div>
						))}
					</div>
				))}
			</div>
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

export default Events;
