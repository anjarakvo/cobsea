/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import styles from './modal.module.scss';
import DetailsView from 'pages/detail/[resource]/[id]';
import bodyScrollLock from 'utils/scroll-lock';

const DetailModal = ({
	match,
	setLoginVisible,
	setFilterMenu,
	isAuthenticated,
	visible,
	setVisible,
}) => {
	let desktopViewport = '';
	useEffect(() => {
		desktopViewport = window?.innerWidth > 600;
	}, []);

	return (
		<Modal
			zIndex={99999}
			visible={visible}
			onCancel={() => {
				setVisible(false);
				bodyScrollLock.disable();
			}}
			className={styles.detailModal}
			wrapClassName='detail-modal-wrapper'
			destroyOnClose={true}
			centered={desktopViewport ? false : true}
			style={{
				top: desktopViewport ? 30 : 0,
			}}
		>
			<DetailsView
				{...{ match, setFilterMenu, isAuthenticated, setLoginVisible }}
			/>
		</Modal>
	);
};

export default DetailModal;
