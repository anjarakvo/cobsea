import React from 'react';
import FilterBar from 'modules/knowledge-lib/filter-bar';
import Head from 'next/head';
import { TopBar } from 'pages';

const ResourceView = () => {
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
		</div>
	);
};

export default ResourceView;
