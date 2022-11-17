import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Row, Col, Space, Input, Button, Modal } from 'antd';
const { TextArea } = Input;

const ContactModal = ({ showContactModal, setShowContactModal }) => {
	return (
		<Modal
			centered
			className='contact-modal'
			title='Contact Us'
			visible={showContactModal}
			onCancel={() => setShowContactModal(false)}
			footer={[
				<Button key='submit' type='primary' className='submit-button'>
					Submit
				</Button>,
				<Button
					className='clear-button'
					onClick={() => setShowContactModal(false)}
				>
					Cancel
				</Button>,
			]}
		>
			<Row type='flex' gutter={[0, 24]}>
				<Input placeholder='Name' />
				<Input placeholder='Email' />
				<Input placeholder='Organisation' />
				<Input placeholder='Subject' />{' '}
				<TextArea rows={4} placeholder='Your message' />
			</Row>
		</Modal>
	);
};

export default ContactModal;
