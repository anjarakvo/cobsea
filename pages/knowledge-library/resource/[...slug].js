import React, { Fragment, useEffect, useState, useMemo } from 'react';
import FilterBar from 'modules/knowledge-lib/filter-bar';
import Head from 'next/head';
import { TopBar } from 'pages';
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import SortIcon from 'images/sort-icon.svg';
import SearchIcon from 'images/search-icon.svg';
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import { useQuery, topicNames } from 'utils';
import classNames from 'classnames';
import styles from '../style.module.scss';

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

	return (
		<div>
			<Head>
				<title>COBSEA | Knowledge library</title>
			</Head>
			<div id='knowledge-library'>
				<TopBar />
			</div>
			<div>
				<FilterBar />
			</div>
			<div className={styles.listContent}>
				<div className={`list-toolbar ${styles.listToolbar}`}>
					<div className='quick-search'>
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
					<ViewSwitch history={router} type={slug[0]} view={slug[1]} />
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
			</div>
		</div>
	);
};

const ViewSwitch = ({ type, view, history }) => {
	const viewOptions = ['map', 'topic', 'grid', 'category'];
	const [visible, setVisible] = useState(false);

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
										history.push({
											pathname: `/knowledge/library/resource/${viewOption}/${
												type && viewOption !== 'category' ? type : ''
											}`,
											search: history.location.search,
										});
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

export default ResourceView;
