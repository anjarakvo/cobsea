import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useQuery } from 'utils';
import { LeftOutlined, CloseOutlined } from '@ant-design/icons';
import { withRouter } from 'next/router';
import styles from './style.module.scss';
import { Icon } from 'components/svg-icon/svg-icon';
import LocationDropdown from 'components/location-dropdown/location-dropdown';
import CountryTransnationalFilter from 'components/select/country-transnational-filter';
import FilterIcon from 'images/filter-icon.svg';

export const resourceTypes = [
	{
		key: 'technical-resource',
		label: 'Technical Resources',
		title: 'technical_resource',
	},
	{ key: 'event', label: 'Events', title: 'event' },
	{ key: 'technology', label: 'Technologies', title: 'technology' },
	{
		key: 'capacity-building',
		label: 'Capacity Building',
		title: 'capacity building',
	},
	{ key: 'initiative', label: 'Initiatives', title: 'initiative' },
	{ key: 'action-plan', label: 'Action Plans', title: 'action_plan' },
	{ key: 'policy', label: 'Policies', title: 'policy' },
	{
		key: 'financing-resource',
		label: 'Financing Resources',
		title: 'financing_resource',
	},
];

const hideFilterList = [
	'offset',
	'country',
	'transnational',
	'topic',
	'view',
	'orderBy',
	'descending',
];

const FilterBar = ({
	setShowFilterModal,
	filterCountries,
	updateQuery,
	multiCountryCountries,
	setMultiCountryCountries,
	history,
	type,
	view,
	search,
	pathname,
}) => {
	const [country, setCountry] = useState([]);
	const [multiCountry, setMultiCountry] = useState([]);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [disable, setDisable] = useState({
		country: false,
		multiCountry: false,
	});
	const { slug: prevSlug, ...rest } = history.query;

	const isEmpty = Object.values(rest).every(
		(x) => x === null || x === undefined || x?.length === 0,
	);

	const handleClickOverview = () => {
		history.push({
			pathname: '/knowledge-library',
			search: '',
		});
	};

	const countryList = (
		<CountryTransnationalFilter
			{...{
				updateQuery,
				multiCountryCountries,
				setMultiCountryCountries,
			}}
			query={rest}
			country={
				rest?.country
					?.split(',')
					.filter((it) => it !== '')
					?.map((x) => parseInt(x)) || []
			}
			multiCountry={
				rest?.transnational
					?.split(',')
					.filter((it) => it !== '')
					?.map((x) => parseInt(x)) || []
			}
			multiCountryLabelCustomIcon={true}
			countrySelectMode='multiple'
			multiCountrySelectMode='multiple'
			fetch={true}
			disable={disable}
			setDisable={setDisable}
		/>
	);

	return (
		<div className={styles.filterBar}>
			<Button className='back-btn' onClick={handleClickOverview}>
				{/* <OverviewIcon /> */}
				<LeftOutlined />
				<span>Back to Overview</span>
			</Button>
			<ul>
				{resourceTypes.map((it) => (
					<li
						key={it.key}
						onClick={() => {
							if (type === it.key)
								history.push({
									pathname: `/knowledge-library/resource/${
										view ? view : 'map'
									}`,
									query: { ...rest },
								});
							else
								history.push({
									pathname: `/knowledge-library/resource/${
										view ? (view === 'category' ? 'grid' : view) : 'map'
									}/${it.key}/`,
									query: { ...rest },
									state: { type: it.key },
								});
						}}
						className={type === it.key ? 'selected' : ''}
					>
						<div className='img-container'>
							<Icon name={`resource-types/${it.key}`} fill='#91c9c1' />
						</div>
						<div className='label-container'>
							<span>{it.label}</span>
						</div>
					</li>
				))}
			</ul>
			<Button className='adv-src' onClick={() => setShowFilterModal(true)}>
				{!isEmpty &&
					Object.keys(rest).filter((item) => !hideFilterList.includes(item))
						.length > 0 && (
						<div className='filter-status'>
							{Object.keys(rest).filter(
								(item) => !hideFilterList.includes(item),
							).length > 0 &&
								Object.keys(rest).filter(
									(item) => !hideFilterList.includes(item),
								).length}
						</div>
					)}
				<FilterIcon />
				<span>Advanced Search</span>
			</Button>
			<LocationDropdown
				{...{
					country,
					multiCountry,
					countryList,
					dropdownVisible,
					setDropdownVisible,
				}}
				query={history.query}
			/>
		</div>
	);
};

export default withRouter(FilterBar);
