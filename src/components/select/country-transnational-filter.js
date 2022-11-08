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
	query,
	updateQuery,
	country,
	multiCountry,
	multiCountryCountries,
	multiCountryLabelCustomIcon,
	countrySelectMode,
	multiCountrySelectMode,
	setMultiCountryCountries,
	isExpert,
	disable,
	setDisable,
	fetch,
}) => {
	const { countries, transnationalOptions, landing } = UIStore.useState(
		(s) => ({
			countries: s.countries,
			transnationalOptions: s.transnationalOptions,
			landing: s.landing,
		}),
	);

	const isLoaded = () => !isEmpty(countries) && !isEmpty(transnationalOptions);

	const countryOpts = isLoaded()
		? countries
				.filter((country) => cobseaContries.includes(country.name))
				.map((it) => ({ value: it.id, label: it.name }))
				.sort((a, b) => a.label.localeCompare(b.label))
		: [];

	const handleChangeLocationTab = (key) => {
		const param = key === 'country' ? 'transnational' : 'country';
	};

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

	const handleChangeMultiCountry = (val) => {
		if (isExpert) {
			updateQuery('transnational', val);
			return;
		}

		if (setDisable) {
			setDisable({
				...disable,
				...(val.length > 0 ? { country: true } : { country: false }),
			});
		}

		updateQuery('transnational', val, fetch);

		// Fetch transnational countries
		val.forEach((id) => {
			const check = multiCountryCountries.find((x) => x.id === id);
			!check &&
				api.get(`/country-group/${id}`).then((resp) => {
					setMultiCountryCountries([
						...multiCountryCountries,
						{ id: id, countries: resp.data?.[0]?.countries },
					]);
				});
		});
	};

	const countryInfoData = multicountryGroups
		.map((transnationalGroup) => transnationalGroup.item)
		.flat();

	return (
		<div className='country-filter-tab'>
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
				// onDeselect={handleDeselectCountry}
				virtual={false}
			/>
		</div>
	);
};

const MultiCountryInfo = ({ data, multiCountryCountries }) => {
	const renderContent = () => {
		return (
			<div className='popover-content-wrapper'>
				{multiCountryCountries &&
					multiCountryCountries.map(({ id, name }) => {
						const curr = data?.map?.find((i) => i?.countryId === id);

						return (
							<div
								key={`popover-${name}-${id}`}
								className='popover-content-item'
							>
								{name}
							</div>
						);
					})}
			</div>
		);
	};

	if (!multiCountryCountries || isEmpty(multiCountryCountries)) {
		return '';
	}
	return (
		<Popover
			overlayClassName='country-info-popover'
			className='popover-multi-country'
			title={''}
			content={renderContent}
			placement='right'
			arrowPointAtCenter
		>
			<InfoCircleOutlined />
		</Popover>
	);
};

export default CountryTransnationalFilter;
