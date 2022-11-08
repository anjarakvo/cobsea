import React, { Fragment } from 'react';
import styles from './style.module.scss';
import { Col, Avatar } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as SwiperPagination, Navigation } from 'swiper';
import 'swiper/css';
import { topicNames } from 'utils';
import technicalResource from 'images/placeholders/technical-resource-placeholder.png';
import actionPlan from 'images/placeholders/action-plan-placeholder.png';
import policy from 'images/placeholders/policy-placeholder.png';
import financingResource from 'images/placeholders/financing-resource-placeholder.png';
import technology from 'images/placeholders/technology-placeholder.png';
import initiative from 'images/placeholders/initiative-placeholder.png';
import event from 'images/placeholders/event-placeholder.png';

const Card = ({ showMoreCardClick, showMoreCardHref, children }) => {
	if (showMoreCardClick) {
		return (
			<div className={styles.card} onClick={showMoreCardClick}>
				{children}
			</div>
		);
	}
	if (showMoreCardHref) {
		return (
			<Link className={styles.card} href={showMoreCardHref}>
				{children}
			</Link>
		);
	}
	return children;
};

const ResourceCards = ({
	items,
	showMoreCard,
	showMoreCardAfter = 0,
	showMoreCardClick,
	showMoreCardHref,
	firstCard,
	showModal = () => null,
}) => {
	if (showMoreCardAfter > 0) {
		if (showMoreCardAfter < items?.length) {
			showMoreCard = (
				<Card {...{ showMoreCardClick, showMoreCardHref }}>
					<div className={styles.resourcesCount}>
						<span className={styles.count}>
							+{items.length - showMoreCardAfter}
						</span>
						<p>resources</p>
					</div>

					<div className={styles.readMore}>
						View All <ArrowRightOutlined />
					</div>
				</Card>
			);
		}
	}

	return (
		<Swiper
			spaceBetween={0}
			slidesPerGroup={4}
			slidesPerView={'auto'}
			pagination={{
				clickable: true,
			}}
			navigation={true}
			modules={[SwiperPagination, Navigation]}
			className={`resource-cards ${styles.resourceCards}`}
		>
			{firstCard && <SwiperSlide>{firstCard}</SwiperSlide>}
			{(showMoreCardAfter > 0 ? items?.slice(0, showMoreCardAfter) : items).map((item) => {
				return (
					<SwiperSlide key={item?.id}>
						<ResourceCard item={item} showModal={showModal} />
					</SwiperSlide>
				);
			})}
			{showMoreCard && (
				<SwiperSlide className={styles.showMoreCard}>
					{showMoreCard}
				</SwiperSlide>
			)}
		</Swiper>
	);
};

const getType = (type) => {
	let t = '';
	switch (type) {
		case 'Action Plan':
			t = 'action_plan';
			break;
		case 'Event':
			t = 'event';
			break;
		case 'Initiative':
			t = 'initiative';
			break;
		case 'Policy':
			t = 'policy';
			break;
		case 'Financing Resource':
			t = 'financing_resource';
			break;
		case 'Technical Resource':
			t = 'technical_resource';
			break;
		case 'Technology':
			t = 'technology';
			break;
		default:
			t = type;
	}
	return t;
};

const getThumbnail = (item) => {
	if (item?.thumbnail) return item.thumbnail;
	if (item?.image) return item.image;
	if (
		item?.type === 'action_plan' ||
		item?.type?.toLowerCase() === 'action plan'
	) {
		return actionPlan;
	}
	if (item?.type?.toLowerCase() === 'policy') {
		return policy;
	}
	if (item?.type?.toLowerCase() === 'technology') {
		return technology;
	}
	if (item?.type?.toLowerCase() === 'event') {
		return event;
	}
	if (
		item?.type?.toLowerCase() === 'initiative' ||
		item?.type?.toLowerCase() === 'initiative'
	) {
		return initiative;
	}
	if (
		item?.type === 'technical_resource' ||
		item?.type?.toLowerCase() === 'technical resource'
	) {
		return technicalResource;
	}
	if (
		item?.type === 'financing_resource' ||
		item?.type?.toLowerCase() === 'financing resource'
	) {
		return financingResource;
	}
};

export const ResourceCard = ({ item, index, showModal }) => {
	return (
		<div className='resource-card' key={index}>
			<Link
				href={`/detail/${getType(item?.type)?.replace('_', '-')}/${item.id}`}
			>
				<a
					onClick={showModal}
					id={item.id}
					type={getType(item?.type)?.replace('_', '-')}
					className='description-holder'
					style={{
						backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${getThumbnail(
							item,
						)})`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
				>
					<div>
						<h3>{item.title}</h3>
						<h4>{item?.type ? topicNames(item?.type) : ''}</h4>
					</div>
					<div className='bottom-panel'>
						<div>
							<Avatar.Group
								maxCount={2}
								size='large'
								maxStyle={{
									color: '#f56a00',
									backgroundColor: '#fde3cf',
									cursor: 'pointer',
								}}
							>
								{item?.entityConnections?.map((connection, index) => (
									<Avatar
										className='related-content-avatar'
										style={{ border: 'none' }}
										key={item?.entity || index}
										src={
											connection?.image ? (
												connection?.image
											) : item?.image ? (
												item.image
											) : (
												<Avatar
													style={{
														backgroundColor: '#09689A',
														verticalAlign: 'middle',
													}}
													size={40}
												>
													{item?.entity?.substring(0, 2)}
												</Avatar>
											)
										}
									/>
								))}
							</Avatar.Group>
						</div>
						<div className='read-more'>
							Read More <ArrowRightOutlined />
						</div>
					</div>
				</a>
			</Link>
			<div className='thumb-container'>
				<Image
					loader={() => getThumbnail(item)}
					src={getThumbnail(item)}
					alt={item?.type}
					layout='fill'
					unoptimized
				/>
			</div>
		</div>
	);
};

export default ResourceCards;
