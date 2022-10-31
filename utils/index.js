import humps from 'humps';
import { useRouter } from 'next/router';

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
		label: 'Capacity Development',
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
	{
		key: 'case-studies',
		label: 'Case Studies',
		title: 'case_studies',
	},
];

export const topicNames = (topic) => {
	const names = {
		initiative: 'Initiative',
		actionPlan: 'Action Plan',
		policy: 'Policy',
		technicalResource: 'Technical Resource',
		financingResource: 'Financing Resource',
		event: 'Event',
		technology: 'Technology',
		organisation: 'Entity',
		stakeholder: 'Individual',
		capacityBuilding: 'Capacity Building',
	};
	return names[humps.camelize(topic)];
};

export const useQuery = () => {
	const router = useRouter();
	const srcParams = new URLSearchParams(router.query);
	const ret = {};
	for (var key of srcParams.keys()) {
		ret[key] = srcParams
			.get(key)
			.split(',')
			.filter((it) => it !== '');
	}
	return ret;
};
