import { Store } from 'pullstate';

const geoCoverageTypeOptions = [
	'Global',
	// "Regional",
	'Transnational',
	'National',
	// "Sub-national",
	// "Global with elements in specific areas",
];

const icons = {
	action_plan: 'action.svg',
	project: 'initiative.svg',
	policy: 'policy.svg',
	technical_resource: 'technical.svg',
	financing_resource: 'financing.svg',
	technology: 'technology.svg',
	event: 'event-flexible.svg',
};

const placeholder = {
	action_plan: 'action.png',
	project: 'initiative.png',
	policy: 'policy.png',
	technical_resource: 'technical.png',
	financing_resource: 'financing.png',
	technology: 'technology.png',
	event: 'event-flexible.png',
};

const entityRole = ['Owner', 'Implementor', 'Partner', 'Donor'];
const individualRole = ['Owner', 'Resource Editor'];

const sectorOptions = [
	'Government',
	'Private Sector',
	'Foundations',
	'Scientific and Technological Community and Academia',
	'Non-Governmental Organization (NGO) and other Major Groups and Stakeholder (MGS)',
	'Intergovernmental Organization (IGOs) and Multilateral Processes Actors',
	'Private Citizens',
];

const entitySuggestedTags = [
	'Circularity',
	'Education',
	'Awareness',
	'Awareness-raising',
	'Monitoring',
	'Research',
	'Waste management',
	'Recycling',
	'Technology',
	'Financing',
	'Project development',
	'Legislation',
	'Policy',
	'Sea-based Sources',
	'ALDFG',
	'Microplastics',
	'Microfibers',
	'International Cooperation',
	'Multilateralism',
];

const stakeholderSuggestedTags = [
	'Waste management',
	'Ocean and coast',
	'Freshwater',
	'Biota',
	'Chemicals',
	'Microplastics',
	'Wastewater',
	'Environmental justice',
	'Human health',
	'Gender',
	'Circularity',
	'Data monitoring',
	'Citizen science',
	'Data analysis',
	'Technology and innovation',
	'Capacity building',
	'Financing',
];

const representativeGroup = [
	{
		code: 'government',
		name: 'Government',
		childs: ['National', 'State/Provincial', 'Municipal'],
	},
	{
		code: 'private-sector',
		name: 'Private Sector (for-profit)',
		childs: { tags: 'sector' }, // All sectors list from tags group
	},
	{
		code: 'igos',
		name: 'Intergovernmental Organizations (IGOs)',
		childs: null,
	},
	{
		code: 'academia-research',
		name: 'Academia and Research',
		childs: ['Public Institute', 'Privately Owned'],
	},
	{
		code: 'civil-society',
		name: 'Civil Society (not-for-profit)',
		childs: ['Non-Governmental Organization (NGOs)', 'Foundations'],
	},
];

export const UIStore = new Store({
	tags: {},
	countries: [],
	currencies: [],
	relatedResource: [],
	profile: {},
	organisations: [],
	nonMemberOrganisations: [],
	geoCoverageTypeOptions: geoCoverageTypeOptions,
	entityRoleOptions: entityRole,
	individualRoleOptions: individualRole,
	regionOptions: [],
	meaOptions: [],
	transnationalOptions: [],
	organisationType: sectorOptions,
	sectorOptions: sectorOptions,
	representativeGroup: representativeGroup,
	entitySuggestedTags: entitySuggestedTags,
	stakeholderSuggestedTags: stakeholderSuggestedTags,
	icons: icons,
	placeholder: placeholder,
	selectedMainContentType: 'initiative',
	landing: null,
	stakeholders: null,
	highlight: false,
	disclaimer: null,
});
