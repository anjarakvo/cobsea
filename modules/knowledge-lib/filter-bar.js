import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useQuery } from 'utils';
import { LeftOutlined, CloseOutlined } from '@ant-design/icons';
import { withRouter } from 'next/router';
import styles from './style.module.scss';
import { Icon } from 'components/svg-icon/svg-icon';

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
	const handleClickOverview = () => {
		history.push({
			pathname: '/knowledge-library',
			search: '',
		});
	};

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
									pathname: `/knowledge/library/resource/${
										view ? view : 'map'
									}`,
									search: search,
								});
							else
								history.push({
									pathname: `/knowledge/library/resource/${
										view ? (view === 'category' ? 'grid' : view) : 'map'
									}/${it.key}/`,
									search: search,
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
		</div>
	);
};

export default withRouter(FilterBar);
