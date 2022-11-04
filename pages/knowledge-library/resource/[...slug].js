import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { Button } from 'antd';
import FilterBar from 'modules/knowledge-lib/filter-bar';
import FilterModal from 'modules/knowledge-lib/filter-modal';
import Head from 'next/head';
import sortBy from 'lodash/sortBy';
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import SortIcon from 'images/sort-icon.svg';
import SearchIcon from 'images/search-icon.svg';
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import { useQuery, topicNames } from 'utils';
import classNames from 'classnames';
import styles from '../style.module.scss';
import ResourceCards, {
	ResourceCard,
} from 'components/resource-cards/resource-cards';
import api from 'utils/api';
import { PullstateCore } from '../../../stores';
import uniqBy from 'lodash/uniqBy';
import TopicView from '../topic-view';

const resourceTopic = [
	'action_plan',
	'initiative',
	'policy',
	'technical_resource',
	'technology',
	'event',
	'financing_resource',
];

const popularTags = [
	'plastics',
	'waste management',
	'marine litter',
	'capacity building',
	'product by design',
	'source to sea',
];

const ResourceView = () => {
	const router = useRouter();
	const slug = router.query.slug || [];
	const query = useQuery();
	const [isAscending, setIsAscending] = useState(null);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [countData, setCountData] = useState([]);
	const [filterCountries, setFilterCountries] = useState([]);
	const [multiCountryCountries, setMultiCountryCountries] = useState([]);
	const [catData, setCatData] = useState([]);
	const [gridItems, setGridItems] = useState([]);
	const [pageNumber, setPageNumber] = useState(false);
	const [showFilterModal, setShowFilterModal] = useState(false);
	const { slug: prevSlug, ...rest } = router.query;
	const { UIStore } = PullstateCore.useStores();

	const type = slug?.[1];

	const limit = 30;
	const totalItems = resourceTopic.reduce(
		(acc, topic) =>
			acc + (countData?.find((it) => it.topic === topic)?.count || 0),
		0,
	);

	const uniqueArrayByKey = (array) => [
		...new Map(array.map((item) => [item['id'], item])).values(),
	];

	useEffect(() => {
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
				e.organisations = uniqBy(sortBy(organisation.data, ['name'])).sort(
					(a, b) => a.name.localeCompare(b.name),
				);
				e.nonMemberOrganisations = uniqBy(
					sortBy(nonMemberOrganisations.data, ['name']),
				).sort((a, b) => a.name.localeCompare(b.name));
			});
		});
	}, []);

	const fetchData = (searchParams) => {
		setLoading(true);
		const queryParams = new URLSearchParams(searchParams);
		if (type || history?.location?.state?.type)
			queryParams.set(
				'topic',
				history?.location?.state?.type
					? history?.location?.state?.type.replace(/-/g, '_')
					: type.replace(/-/g, '_'),
			);

		if (
			type === 'capacity-building' ||
			history?.location?.state?.type === 'capacity-building'
		) {
			queryParams.set('capacity_building', ['true']);
			queryParams.delete('topic');
		}
		queryParams.set('incCountsForTags', popularTags);
		queryParams.set('limit', limit);
		queryParams.delete('slug');

		const url = `/browse?${String(queryParams)}`;
		api
			.get(url)
			.then((resp) => {
				setLoading(false);
				setData(resp?.data);
				setCountData(resp?.data?.counts);
				setGridItems((prevItems) => {
					return uniqueArrayByKey([...prevItems, ...resp?.data?.results]);
				});
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	};

	const updateQuery = (param, value, reset, fetch = true) => {
		if (!reset) {
			setPageNumber(null);
			setGridItems([]);
		}
		const newQuery = { ...router.query };
		newQuery[param] = value;
		console.log(router);

		if (param === 'descending' || query.hasOwnProperty('descending')) {
			newQuery['orderBy'] = 'title';
		}

		if (newQuery.hasOwnProperty('country'))
			setFilterCountries(newQuery.country);

		// Remove empty query
		const arrayOfQuery = Object.entries(newQuery)?.filter(
			(item) => item[1]?.length !== 0 && typeof item[1] !== 'undefined',
		);

		const pureQuery = Object.fromEntries(arrayOfQuery);

		const newParams = new URLSearchParams(pureQuery);

		newParams.delete('offset');

		// if (router.isReady)
		// 	if (param === 'replace')
		// 		router.replace({
		// 			pathname: router.pathname,
		// 			query: newParams.toString(),
		// 			state: { type: slug?.[1] },
		// 		});
		// 	else
		// 		router.push({
		// 			pathname: router.pathname,
		// 			query: newParams.toString(),
		// 			state: { type: slug?.[1] },
		// 		});

		if (fetch && slug?.[0] !== 'category') fetchData(pureQuery);

		if (slug?.[0] === 'category') loadAllCat(pureQuery);

		if (param === 'country') {
			setFilterCountries(value);
		}
	};

	const loadAllCat = async (filter) => {
		setLoading(true);

		const queryParams = new URLSearchParams(filter);
		const promiseArray = resourceTopic.map((url) =>
			api.get(`/browse?topic=${url}&${String(queryParams)}`),
		);

		Promise.all(promiseArray)
			.then((data) => {
				const newData = resourceTopic.map((categories, idx) => ({
					categories,
					data: data[idx].data.results,
					count: data[idx]?.data?.counts[0]?.count || 0,
				}));
				setCatData(newData);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	useMemo(() => {
		if (router.pathname && !loading) updateQuery('replace');
	}, [router]);

	useEffect(() => {
		if (router.isReady) {
			if (data.length === 0) {
				console.log('SAd');
				updateQuery();
			}
		}
	}, [router]);

	const clickCountry = (name) => {
		const val = query['country'];
		let updateVal = [];

		if (isEmpty(val)) {
			updateVal = [name];
		} else if (val.includes(name)) {
			updateVal = val.filter((x) => x !== name);
		} else {
			updateVal = [...val, name];
		}
		updateQuery('country', updateVal, true);
	};

	const handleCategoryFilter = (key) => {
		router.push({
			pathname: `/knowledge-library/resource/${
				slug?.[0] ? (slug?.[0] === 'category' ? 'grid' : slug?.[0]) : 'map'
			}/${key.replace(/_/g, '-')}/`,
			query: { ...rest },
			state: { type: key.replace(/-/g, '_') },
		});
	};

	const sortResults = (ascending) => {
		setPageNumber(null);
		if (!ascending) {
			updateQuery('descending', 'false', true);
		} else {
			updateQuery('descending', 'true', true);
		}
		setIsAscending(ascending);
	};

	return (
		<div>
			<Head>
				<title>COBSEA | Knowledge library</title>
			</Head>
			<div id='knowledge-library'>
				<div>
					<FilterBar
						history={router}
						type={slug[1]}
						view={slug[0]}
						setShowFilterModal={setShowFilterModal}
					/>
				</div>
				<div className={styles.listContent}>
					<div className={`list-toolbar ${styles.listToolbar}`}>
						<div className={styles.quickSearch}>
							<div className='count'>
								{slug.toString() === 'grid'
									? `Showing ${gridItems?.length} of ${totalItems}`
									: slug.toString() === 'category'
									? `${catData?.reduce(
											(count, current) => count + current?.count,
											0,
									  )}`
									: `Showing ${!loading ? data?.results?.length : ''}`}
							</div>
							<div className='search-icon'>
								<SearchIcon />
							</div>
						</div>
						<ViewSwitch history={router} type={slug[1]} view={slug[0]} />
						<button
							className='sort-by-button'
							onClick={() => {
								if (slug.toString() === 'grid') setGridItems([]);
								sortResults(!isAscending);
							}}
						>
							<SortIcon
								style={{
									transform:
										!isAscending || isAscending === null
											? 'initial'
											: 'rotate(180deg)',
								}}
							/>
							<div className='sort-button-text'>
								<span>Sort by:</span>
								<b>{!isAscending ? `A>Z` : 'Z>A'}</b>
							</div>
						</button>
					</div>
					{(slug?.[0] === 'map' || slug?.[0] === 'topic') && (
						<div style={{ position: 'relative' }}>
							<ResourceCards
								items={data?.results}
								showMoreCardAfter={20}
								showMoreCardClick={() => {
									router.push({
										pathname: `/knowledge-library/resource/grid/${
											slug ? slug?.[1] : ''
										}`,
										query: history.location.search,
									});
								}}
								// showModal={(e) =>
								// 	showModal({
								// 		e,
								// 		type: e.currentTarget.type,
								// 		id: e.currentTarget.id,
								// 	})
								// }
							/>
							{loading && (
								<div className={styles.loading}>
									<LoadingOutlined spin />
								</div>
							)}
						</div>
					)}
					{slug?.[0] === 'category' && (
						<div className={styles.catView}>
							{loading && (
								<div className={styles.loading}>
									<LoadingOutlined spin />
								</div>
							)}
							{catData.map((d) => (
								<Fragment key={d.categories}>
									{d?.count > 0 && (
										<>
											<div className='header-wrapper'>
												<div className='title-wrapper'>
													<h4 className='cat-title'>
														{topicNames(d.categories)}
													</h4>
													<div className={styles.quickSearch}>
														<div className='count'>{d?.count}</div>
														<div className='search-icon'>
															<SearchIcon />
														</div>
													</div>
												</div>
												<Button
													type='link'
													block
													onClick={() => {
														handleCategoryFilter(d.categories);
													}}
												>
													See all {`>`}
												</Button>
											</div>
											<ResourceCards
												items={d?.data}
												showMoreCardAfter={20}
												showMoreCardClick={() => {
													handleCategoryFilter(d.categories);
												}}
												showModal={(e) =>
													showModal({
														e,
														type: e.currentTarget.type,
														id: e.currentTarget.id,
													})
												}
											/>
										</>
									)}
								</Fragment>
							))}
						</div>
					)}
					{slug?.[0] === 'topic' && (
						<div className='topic-view-container'>
							<TopicView
								results={data?.results}
								fetch={true}
								loading={loading}
								countData={countData.filter(
									(count) => count.topic !== 'gpml_member_entities',
								)}
								updateQuery={updateQuery}
								query={rest}
								history={router}
								type={slug[1]}
							/>
						</div>
					)}
					{slug?.[0] === 'grid' && (
						<GridView
							{...{
								gridItems,
								totalItems,
								limit,
								loading,
								setPageNumber,
								pageNumber,
								updateQuery,
								// showModal,
							}}
						/>
					)}
				</div>
			</div>
			<FilterModal
				{...{
					query,
					setShowFilterModal,
					showFilterModal,
					updateQuery,
					fetchData,
					filterCountries,
					pathname: router.pathname,
					history: router,
					setGridItems,
					loadAllCat,
					view: slug?.[0],
					type: slug?.[1],
				}}
			/>
		</div>
	);
};

const ViewSwitch = ({ type, view, history }) => {
	const viewOptions = ['map', 'topic', 'grid', 'category'];
	const [visible, setVisible] = useState(false);

	const { slug: slug, ...rest } = history.query;

	return (
		<div className='view-switch-container'>
			<div
				className={classNames('switch-btn', { active: visible })}
				onClick={() => {
					setVisible(!visible);
				}}
			>
				<DownOutlined />
				{view} view
			</div>
			<CSSTransition
				in={visible}
				timeout={200}
				unmountOnExit
				classNames='view-switch'
			>
				<div className='view-switch-dropdown'>
					<ul>
						{viewOptions
							.filter((opt) => view !== opt)
							.map((viewOption) => (
								<li
									key={viewOption}
									onClick={() => {
										setVisible(!visible);
										history.push(
											{
												pathname: `/knowledge-library/resource/${viewOption}/${
													type && viewOption !== 'category' ? type : ''
												}`,
												query: { ...rest },
											},
											undefined,
											{ shallow: true },
										);
									}}
								>
									{viewOption} view
								</li>
							))}
					</ul>
				</div>
			</CSSTransition>
		</div>
	);
};

const GridView = ({
	gridItems,
	loading,
	updateQuery,
	totalItems,
	limit,
	setPageNumber,
	pageNumber,
	showModal,
}) => {
	return (
		<div className={styles.gridView}>
			<div className='items'>
				{gridItems?.map((item, index) => (
					<ResourceCard
						item={item}
						key={item.id * index}
						showModal={(e) =>
							showModal({
								e,
								type: item?.type.replace('_', '-'),
								id: item?.id,
							})
						}
					/>
				))}
			</div>
			{!loading && gridItems?.length < totalItems && (
				<Button
					className='load-more'
					loading={loading}
					onClick={() => {
						setPageNumber((prevNumber) => prevNumber + limit);
						updateQuery('offset', [pageNumber + limit], true);
					}}
				>
					Load More
				</Button>
			)}
		</div>
	);
};

export default ResourceView;
