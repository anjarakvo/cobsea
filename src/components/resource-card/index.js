import './style.scss';
import { Skeleton } from 'antd';

const ResourceCard = ({ item, onClick }) => {
  const types = [
    { name: 'Project', value: 'project' },
    { name: 'Technical Resource', value: 'technical_resource' },
    { name: 'Technology', value: 'technology' },
    { name: 'Action Plan', value: 'action_plan' },
    { name: 'Legislation', value: 'policy' },
    { name: 'Financing Resource', value: 'financing_resource' },
    { name: 'Case Study', value: 'case_study' },
    { name: 'Initiative', value: 'initiative' },
    { name: 'Event', value: 'event' },
    { name: 'Data Portal', value: 'data_catalog' },
  ];

  const withImage = item?.images?.length > 0 || item?.images?.thumbnail;

  const handleClick = (e) => {
    onClick({ e, item });
  };

  const hasMeta = item?.incBadges?.length > 0 || item?.likes > 0;

  return (
    <div
      className={` resource-card ${withImage ? 'withImage' : ''}`}
      onClick={handleClick}
    >
      <div className="type caps-heading-xs">
        {types.find((it) => it.value === item?.type)?.name}
      </div>
      <h4 className={`h-xs ${hasMeta ? 'hasMeta' : ''}`}>{item.title}</h4>
      {item?.images?.length > 0 && (
        <img
          src={`https://globalplasticshub.org/img400/${item?.images?.[0].objectKey}`}
          width={195}
          height={175}
          alt={item.title || 'Resource image'}
        />
      )}
      {item?.images?.thumbnail && (
        <img
          src={item?.images?.medium?.url || item?.images?.thumbnail.url}
          width={195}
          height={175}
          alt={item.title || 'Resource thumbnail'}
          style={{ objectFit: 'cover' }}
        />
      )}
    </div>
  );
};

export const ResourceCardSkeleton = () => {
  return (
    <div className="resource-card">
      <Skeleton active loading />
    </div>
  );
};

export default ResourceCard;
