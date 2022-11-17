import React, { useState } from 'react';
import MenuBar from 'components/menu';
import './styles.scss';
import { Row, Col, Button, Card, Avatar } from 'antd';
import ContactModal from 'components/contact-modal';

function ResearchNetwork() {
	const [showContactModal, setShowContactModal] = useState(false);

	return (
		<div>
			<MenuBar />
			<div id='research-network'>
				<div className='header'>
					<div className='ui container'>
						<Row>
							<Col sm={12} md={12} lg={18} xl={18}>
								<div>
									<h3>
										What is the Regional Research Network of the Regional Node?
									</h3>
									<p>
										A network of science and academic institutions and
										researchers in the East Asian Seas region that come together
										to share findings on marine litter and plastic pollution
										research. The network is interdisciplinary and aims to
										catalyse collaborative research to address policy priorities
										and knowledge needs.
									</p>
								</div>
							</Col>
							<Col sm={12} md={12} lg={6} xl={6}>
								<div className='call-to-action'>
									<h3>Are you a researcher?</h3>
									<Button
										key='submit'
										type='primary'
										className='action-button'
										onClick={() => setShowContactModal(true)}
									>
										Get in touch
									</Button>
								</div>
							</Col>
						</Row>
					</div>
				</div>
				<div className='profile-section'>
					<div className='ui container'>
						<Row gutter={16}>
							<Col sm={12} md={12} lg={12} xl={8}>
								<Card bordered={false}>
									<Row type='flex' className='profile-details'>
										<div className='image-wrapper'>
											<Avatar />
										</div>
										<div className='details-container'>
											<h4>Institutions Name</h4>
											<p>Prof name 1, research field</p>
											<p>Prof name 1, research field</p>
										</div>
									</Row>
								</Card>
							</Col>
							<Col sm={12} md={12} lg={12} xl={8}>
								<Card bordered={false}>
									<Row type='flex' className='profile-details'>
										<div className='image-wrapper'>
											<Avatar />
										</div>
										<div className='details-container'>
											<h4>Institutions Name</h4>
											<p>Prof name 1, research field</p>
											<p>Prof name 1, research field</p>
										</div>
									</Row>
								</Card>
							</Col>
							<Col sm={12} md={12} lg={12} xl={8}>
								<Card bordered={false}>
									<Row type='flex' className='profile-details'>
										<div className='image-wrapper'>
											<Avatar />
										</div>
										<div className='details-container'>
											<h4>Institutions Name</h4>
											<p>Prof name 1, research field</p>
											<p>Prof name 1, research field</p>
										</div>
									</Row>
								</Card>
							</Col>
							<Col sm={12} md={12} lg={12} xl={8}>
								<Card bordered={false}>
									<Row type='flex' className='profile-details'>
										<div className='image-wrapper'>
											<Avatar />
										</div>
										<div className='details-container'>
											<h4>Institutions Name</h4>
											<p>Prof name 1, research field</p>
											<p>Prof name 1, research field</p>
										</div>
									</Row>
								</Card>
							</Col>
							<Col sm={12} md={12} lg={12} xl={8}>
								<Card bordered={false}>
									<Row type='flex' className='profile-details'>
										<div className='image-wrapper'>
											<Avatar />
										</div>
										<div className='details-container'>
											<h4>Institutions Name</h4>
											<p>Prof name 1, research field</p>
											<p>Prof name 1, research field</p>
										</div>
									</Row>
								</Card>
							</Col>
							<Col sm={12} md={12} lg={12} xl={8}>
								<Card bordered={false}>
									<Row type='flex' className='profile-details'>
										<div className='image-wrapper'>
											<Avatar />
										</div>
										<div className='details-container'>
											<h4>Institutions Name</h4>
											<p>Prof name 1, research field</p>
											<p>Prof name 1, research field</p>
										</div>
									</Row>
								</Card>
							</Col>
							<Col sm={12} md={12} lg={12} xl={8}>
								<Card bordered={false}>
									<Row type='flex' className='profile-details'>
										<div className='image-wrapper'>
											<Avatar />
										</div>
										<div className='details-container'>
											<h4>Institutions Name</h4>
											<p>Prof name 1, research field</p>
											<p>Prof name 1, research field</p>
										</div>
									</Row>
								</Card>
							</Col>
							<Col sm={12} md={12} lg={12} xl={8}>
								<Card bordered={false}>
									<Row type='flex' className='profile-details'>
										<div className='image-wrapper'>
											<Avatar />
										</div>
										<div className='details-container'>
											<h4>Institutions Name</h4>
											<p>Prof name 1, research field</p>
											<p>Prof name 1, research field</p>
										</div>
									</Row>
								</Card>
							</Col>
							<Col sm={12} md={12} lg={12} xl={8}>
								<Card bordered={false}>
									<Row type='flex' className='profile-details'>
										<div className='image-wrapper'>
											<Avatar />
										</div>
										<div className='details-container'>
											<h4>Institutions Name</h4>
											<p>Prof name 1, research field</p>
											<p>Prof name 1, research field</p>
										</div>
									</Row>
								</Card>
							</Col>
						</Row>
					</div>
				</div>
			</div>
			<ContactModal
				{...{
					showContactModal,
					setShowContactModal,
				}}
			/>
		</div>
	);
}

export default ResearchNetwork;
