import React, { Fragment, useEffect, useState, useMemo, useRef } from 'react';
import api from 'utils/api';
import { Icon } from "components/svg-icon";
import ResourceCards from 'components/resource-cards';
import { LoadingOutlined } from '@ant-design/icons';
import { ReactComponent as SortIcon } from 'images/knowledge-library/sort-icon.svg';
import { ReactComponent as SearchIcon } from 'images/search-icon.svg';
import { useQuery,  } from 'utils/misc';
import { useParams, useLocation } from 'react-router-dom';
import ResourceJson from './resource.json';

const resourceTopic = [
	'action_plan',
	'initiative',
	'policy',
	'technical_resource',
	'technology',
	'event',
	'financing_resource',
];

function ResourceView({ history, popularTags, landing, box, showModal }) {
	const query = useQuery();
	const [isAscending, setIsAscending] = useState(null);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [countData, setCountData] = useState([]);
	const [filterType, setFilterType] = useState([]);
	const [catData, setCatData] = useState([]);
	const [gridItems, setGridItems] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const { type, view } = useParams();
	const { pathname, search } = useLocation();

	let headerHeight = useRef(0);
	let footerHeight = useRef(0);

	const limit = 30;
	const totalItems = resourceTopic.reduce(
		(acc, topic) =>
			acc + (countData?.find((it) => it.topic === topic)?.count || 0),
		0,
	);

	const uniqueArrayByKey = (array) => [
		...new Map(array.map((item) => [item['id'], item])).values(),
	];

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
		queryParams.set('incCountsForTags', popularTags);
		queryParams.set('limit', limit);
		queryParams.set('transnational', 132);
		queryParams.set('capacity_building', ['true']);

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
			setGridItems([]);
		}
		const newQuery = { ...query };
		newQuery[param] = value;

		if (param === 'descending' || query.hasOwnProperty('descending')) {
			newQuery['orderBy'] = 'title';
		}
		// Remove empty query
		const arrayOfQuery = Object.entries(newQuery)?.filter(
			(item) => item[1]?.length !== 0 && typeof item[1] !== 'undefined',
		);

		const pureQuery = Object.fromEntries(arrayOfQuery);

		const newParams = new URLSearchParams(pureQuery);

		newParams.delete('offset');

		if (param === 'replace')
			history.replace({
				pathname: pathname,
				search: newParams.toString(),
				state: { type: type },
			});
		else
			history.push({
				pathname: pathname,
				search: newParams.toString(),
				state: { type: type },
			});

		if (fetch && view !== 'category') fetchData(pureQuery);

	};

	useEffect(() => {
		if (data.length === 0) {
			setLoading(false);
			setCatData(ResourceJson);
			setFilterType(ResourceJson?.map((item) => {
				return {title: item.title,icon:item.icon}
			}));
		}
	}, [data, view]);

	const handleCategoryFilter = (key) => {
		history.push({
			pathname: `/capacity-building/${
				view ? (view === 'category' ? 'grid' : view) : 'map'
			}/${key.replace(/_/g, '-')}/`,
			search: search,
			state: { type: key.replace(/-/g, '_') },
		});
	};

	function sortArray(array) {
		console.log(array)
		array.sort((a, b) => a.title - b.title);
		array.forEach(a => {
			if (a.resource && a.resource.length > 0)
				sortArray(a.children)
		})
		return array;
	}
	


	const handleSelected = (title) => {
		setSelectedCategory(title)
		setCatData(ResourceJson.filter((item) => item.title === title))
	}

	useEffect(() => {
		headerHeight.current = document.getElementById('header')?.clientHeight;
		footerHeight.current = document.getElementById('footer')?.clientHeight;
	}, []);

	return (
		<Fragment>
			<div className='filter-bar'>
				<ul>
					{filterType.map((it) => (
						<li
							key={it.title}
							onClick={() => {
								if (selectedCategory === it.title) {
									setSelectedCategory('')
									setCatData(ResourceJson)
								}
								else {
									handleSelected(it.title)
								}
							}}
							className={selectedCategory === it.title ? 'selected' : ''}
						>
							<div className='img-container'>
								<Icon name={`resource-types/${it.icon}`} fill="#FFF" />
							</div>
							<div className='label-container'>
								<span>{it.title}</span>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className='list-content'>
				<div className='list-toolbar'>
					<div className='quick-search'>
						<div className='count'>
							{view === 'grid'
								? `Showing ${gridItems?.length} of ${totalItems}`
								: view === 'category'
								? `${catData?.reduce(
										(count, current) => count + current?.resource.length,
										0,
								  )}`
								: `Showing ${!loading ? data?.length : ''}`}
						</div>
						<div className='search-icon'>
							<SearchIcon />
						</div>
					</div>
				</div>
				{loading ? (
					<div
						className='loading'
						style={{
							height: `calc(100vh - ${
								headerHeight.current + footerHeight.current
							}px)`,
						}}
					>
						<LoadingOutlined spin />
					</div>
				) : catData?.filter((item) => item?.resource?.length > 0)?.length === 0  ? (
					<div
						className='no-result'
						style={{
							height: `calc(100vh - ${(
								headerHeight.current + footerHeight.current
							).toString()}px)`,
						}}
					>
						<p>No results</p>
					</div>
				) : (
					<>
						{view === 'category' && (
							<div className='cat-view'>
								{catData.map((d) => (
									<Fragment key={d.title}>
										{d?.resource?.length > 0 && (
											<>
												<div className='header-wrapper'>
													<div className='title-wrapper'>
														<h4 className='cat-title'>
															{(d.title)}
														</h4>
														<div className='quick-search'>
															<div className='count'>{d?.resource?.length}</div>
															<div className='search-icon'>
																<SearchIcon />
															</div>
														</div>
													</div>
												</div>
												<ResourceCards
													items={d?.resource}
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
					</>
				)}
			</div>
		</Fragment>
	);
}

export default ResourceView;
