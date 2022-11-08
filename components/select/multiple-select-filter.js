import React from 'react';
import { Col, Space, Tag, Select } from 'antd';
import isEmpty from 'lodash/isEmpty';
import styles from './style.module.scss';

const MultipleSelectFilter = ({
	title,
	options,
	value,
	query,
	flag,
	updateQuery,
	span = 24,
	clear,
}) => {
	return (
		<Col span={span} className={styles.multiselectionFilter}>
			<Space align='middle'>
				<div className='filter-title multiple-filter-title'>{title}</div>
			</Space>
			<div>
				<Select
					popupClassName='multiselection-dropdown'
					showSearch
					allowClear
					aria-multiline
					mode='multiple'
					placeholder='All (default)'
					options={options}
					filterOption={(input, option) =>
						option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					value={value}
					onChange={(val) => updateQuery(flag, val)}
					onDeselect={(val) => updateQuery(flag, [])}
					virtual={false}
				/>
			</div>
		</Col>
	);
};

export default MultipleSelectFilter;
