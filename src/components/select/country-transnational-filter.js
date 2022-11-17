import React from 'react';
import { Select, Tabs, Popover } from 'antd';
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import isEmpty from 'lodash/isEmpty';
import { UIStore } from '../../store';
import { multicountryGroups } from './multicountry';
import './style.scss';
import api from 'utils/api';

const cobseaContries = [
	'Cambodia',
	'China',
	'Indonesia',
	'Republic of Korea',
	'Philippines',
	'Thailand',
	'Singapore',
	'Viet Nam',
	'Malaysia',
];

const CountryTransnationalFilter = ({
	updateQuery,
	country,
	countrySelectMode,
	isExpert,
	disable,
	setDisable,
	fetch,
}) => {
	const { countries, transnationalOptions } = UIStore.useState((s) => ({
		countries: s.countries,
		transnationalOptions: s.transnationalOptions,
		landing: s.landing,
	}));

	const isLoaded = () => !isEmpty(countries) && !isEmpty(transnationalOptions);

	const countryOpts = isLoaded()
		? countries
				.filter((country) => cobseaContries.includes(country.name))
				.map((it) => ({ value: it.id, label: it.name }))
				.sort((a, b) => a.label.localeCompare(b.label))
		: [];

	const handleChangeCountry = (val) => {
		if (isExpert) {
			updateQuery('country', val);
			return;
		}
		if (setDisable) {
			setDisable({
				...disable,
				...(val.length > 0 ? { multiCountry: true } : { multiCountry: false }),
			});
		}
		updateQuery('country', val, false);
	};

	return (
		<div className='country-filter-tab'>
			<div className='filter-title multiple-filter-title'>Countries</div>
			<Select
				showSearch
				allowClear
				dropdownClassName='multiselection-dropdown'
				mode={countrySelectMode || ''}
				placeholder='Countries'
				options={countryOpts}
				optionFilterProp='children'
				filterOption={(input, option) =>
					option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				value={country}
				onChange={handleChangeCountry}
				virtual={false}
			/>
		</div>
	);
};

export default CountryTransnationalFilter;
