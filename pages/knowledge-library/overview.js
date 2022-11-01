import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import Link from 'next/link';
import { resourceTypes } from 'utils';
import api from 'utils/api';
import { Icon } from 'components/svg-icon/svg-icon';
import styles from './style.module.scss';
import ResourceCards from 'components/resource-cards/resource-cards';
import TopicView from './topic-view';
import { LoadingOutlined } from '@ant-design/icons';

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
	const allResources = countData
		?.filter((array) =>
			resourceTypes.some(
				(filter) =>
					array.topic === filter.title && filter.title !== 'capacity building',
			),
		)
		?.reduce(function (acc, obj) {
			return acc + obj.count;
		}, 0);

	if (loading) {
		return (
			<div className={styles.overview}>
				<div className={styles.loading}>
					<LoadingOutlined spin />
				</div>
			</div>
		);
	}

	const handleClickCategory = (key) => () => {
		history.push({
			pathname: `/knowledge/library/resource/map/${key}`,
		});
	};

	return (
		<div className={styles.overview}>
			<ul className='categories'>
				<li
					onClick={() => {
						history.push({
							pathname: `/knowledge-library/resource/category`,
						});
					}}
				>
					<div>
						<Icon name={`all`} fill='#255B87' />
						<b>{allResources}</b>
					</div>
					<span>All Resources</span>
				</li>
				{resourceTypes.map((type) => (
					<li onClick={handleClickCategory(type.key)} key={type.key}>
						<div>
							<Icon name={`resource-types/${type.key}`} fill='#91C9C1' />
							<b>
								{countData.find((item) => type.title === item.topic)?.count ||
									'XX'}
							</b>
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
			<section>
				<Row gutter={16}>
					<Col sm={24} md={24} lg={12} xl={12}>
						<h3>Resources by location</h3>
						<div
							className='overlay-btn'
							// onClick={() => {
							//   history.push({
							//     pathname: `/knowledge/library/resource/map`,
							//   });
							// }}
						>
							{/* <Maps
                {...{ box, query, countData }}
                data={landing?.map || []}
                isLoaded={() => true}
                useTooltips={false}
                showLegend={false}
                zoom={0.9}
                path="knowledge"
              /> */}
						</div>
					</Col>
					<Col sm={24} md={24} lg={12} xl={12}>
						<h3>Resources by topic</h3>
						<div
							className='overlay-btn'
							onClick={(e) => {
								history.push({
									pathname: `/knowledge/library/resource/topic`,
								});
							}}
						>
							<TopicView
								{...{ query, loading }}
								results={data?.results}
								fetch={true}
								countData={countData.filter(
									(count) => count.topic !== 'gpml_member_entities',
								)}
							/>
						</div>
					</Col>
				</Row>
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
