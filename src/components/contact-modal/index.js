import React, { useEffect, useState } from 'react';
import './styles.scss';
import api from 'utils/api';
import { Row, Form, Input, Button, Modal, notification } from 'antd';
const { TextArea } = Input;

const ContactModal = ({ showContactModal, setShowContactModal }) => {
	const [loading, setLoading] = useState(false);
	const onsubmit = async (values) => {
		setLoading(true);
		const data = {
			...values,
			source: 'cobsea',
		};

		api
			.post('/contact', data)
			.then((res) => {
				notification.success({
					message: 'Contact form successfully submitted',
				});
				setLoading(false);
			})
			.catch(() => {
				notification.error({ message: 'An error occured' });
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Modal
			centered
			className='contact-modal'
			title='Contact Us'
			visible={showContactModal}
			onCancel={() => setShowContactModal(false)}
			footer={[
				<Button
					form='contact'
					key='submit'
					htmlType='submit'
					type='primary'
					className='submit-button'
					loading={loading}
				>
					Submit
				</Button>,
				<Button
					key='cancel'
					className='clear-button'
					onClick={() => setShowContactModal(false)}
				>
					Cancel
				</Button>,
			]}
		>
			<Row type='flex' gutter={[0, 24]}>
				<Form
					id='contact'
					name='basic'
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 24 }}
					initialValues={{ remember: true }}
					onFinish={onsubmit}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Form.Item
						name='name'
						rules={[{ required: true, message: 'Please input your name!' }]}
					>
						<Input placeholder='Name' />
					</Form.Item>
					<Form.Item
						name='email'
						rules={[{ required: true, message: 'Please input your email!' }]}
					>
						<Input placeholder='Email' />
					</Form.Item>
					<Form.Item
						name='organization'
						rules={[
							{ required: true, message: 'Please input your organisation!' },
						]}
					>
						<Input placeholder='Organisation' />
					</Form.Item>
					<Form.Item
						name='subject'
						rules={[{ required: true, message: 'Please input your subject!' }]}
					>
						<Input placeholder='Subject' />
					</Form.Item>
					<Form.Item
						name='message'
						rules={[{ required: true, message: 'Please input your message!' }]}
					>
						<TextArea rows={4} placeholder='Your message' />
					</Form.Item>
				</Form>
			</Row>
		</Modal>
	);
};

export default ContactModal;
