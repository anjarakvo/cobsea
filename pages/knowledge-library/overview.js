import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import Link from 'next/link';
import { resourceTypes } from 'utils';
import api from 'utils/api';
import { Icon } from 'components/svg-icon/svg-icon';
import styles from './style.module.scss';
import ResourceCards from 'components/resource-cards/resource-cards';

const Overview = ({
	summaryData,
	box,
	query,
	countData,
	landing,
	data,
	loading,
	history,
	showModal,
	setLoginVisible,
	isAuthenticated,
}) => {
	return (
		<div className={styles.overview}>
			<ul className={styles.categories}>
				<li>
					<div>
						<Icon name={`all`} fill='#255B87' />
						<b>{12}</b>
					</div>
					<span>All Resources</span>
				</li>
				{resourceTypes.map((type) => (
					<li key={type.key}>
						<div>
							<Icon name={`resource-types/${type.key}`} fill='#91C9C1' />
							<b>21</b>
						</div>
						<span>{type.label}</span>
					</li>
				))}
			</ul>
			<section className={styles.grey}>
				{/* <h3>Categories</h3> */}
				<Featured
					{...{ showModal, setLoginVisible, isAuthenticated, history }}
				/>
			</section>
		</div>
	);
};

const Featured = ({ showModal, isAuthenticated, setLoginVisible, history }) => {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		api.get('/browse?featured=true').then(({ data }) => {
			setResults(data.results);
			setLoading(false);
		});
	}, []);
	return (
		<>
			<h3>Featured resources</h3>
			<ResourceCards
				items={results}
				showMoreCardAfter={20}
				showMoreCardClick={() => {
					history.push({
						pathname: `/flexible-forms`,
					});
				}}
				showModal={(e) =>
					showModal({
						e,
						type: e.currentTarget.type,
						id: e.currentTarget.id,
					})
				}
				firstCard={
					<div
						onClick={(e) => {
							e.preventDefault();
							if (isAuthenticated)
								history.push({
									pathname: `/flexible-forms`,
								});
							else setLoginVisible(true);
						}}
					>
						<div className='add-resource-card'>
							<b>+</b>
							<span>Share your resource</span>
							<small>Contribute to the library</small>
						</div>
					</div>
				}
			/>
		</>
	);
};

export default Overview;
