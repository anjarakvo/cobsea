import React from 'react';
import ReactECharts from 'echarts-for-react';
import TreeMap from './tree-map';

export const generateOptions = ({ type, data }, extra, axis, selected) => {
	switch (type) {
		case 'TREEMAP':
			return TreeMap(data, extra, selected);
		default:
			return TreeMap(data, extra);
	}
};

const Chart = ({
	type,
	title = '',
	height = 450,
	span = 12,
	data,
	extra = {},
	axis = null,
	onEvents = false,
	selected = false,
	className = '',
}) => {
	data = data.map((x) => ({
		...x,
		name: x.name,
		var: x.name,
	}));
	const option = generateOptions(
		{ type: type, data: data },
		extra,
		axis,
		selected,
	);
	return (
		<ReactECharts
			className={className}
			option={option}
			style={{ height: height - 50, width: '100%' }}
			onEvents={onEvents}
		/>
	);
};

export default Chart;
