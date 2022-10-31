import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { TopBar } from '..';
import Overview from './overview';
import { useQuery } from 'utils';
import api from 'utils/api';

const popularTags = [
	'plastics',
	'waste management',
	'marine litter',
	'capacity building',
	'product by design',
	'source to sea',
];

export default function KnowledgeLibrary() {
	const query = useQuery();
	const [landing, setLanding] = useState([]);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [countData, setCountData] = useState([]);

	const fetchData = () => {
		setLoading(true);
		const url = `/browse?incCountsForTags=${popularTags}`;

		api
			.get(url)
			.then((resp) => {
				setLoading(false);
				setData(resp?.data);
				setCountData(resp?.data?.counts);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		api.get(`/landing?entityGroup=topic`).then((resp) => {
			setLanding(resp.data);
		});
	}, []);

	return (
		<div>
			<Head>
				<title>COBSEA | Knowledge library</title>
			</Head>
			<div id='knowledge-library'>
				<TopBar />
			</div>
			<Overview
				summaryData={landing?.summary}
				{...{
					query,
					countData,
					landing,
					data,
					loading,
				}}
			/>
		</div>
	);
}
