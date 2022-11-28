import React from 'react';
import './styles.scss';
import { Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

function Events() {
	return (
		<div id='events'>
			<div className='ui container'>
				<div className='year'>
					<h3>2022</h3>
					<div className='month'>
						<h4>December</h4>
						<Card>
							<Meta
								avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
								title='Card title'
								description={
									<>
										<div className='date'>05 Dec - 10 Dec</div>
										<p>
											Join us for this year’s UN World Oceans Day annual event
											as we hear from thought-leaders, celebrities,
											institutional partners, community voices, entrepreneurs,
											and cross-industry experts about the ...
										</p>
										<Link className='read-more'>Read more {`>`}</Link>
									</>
								}
							/>
						</Card>
						<Card>
							<Meta
								avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
								title='Card title'
								description={
									<>
										<div className='date'>05 Dec - 10 Dec</div>
										<p>
											Join us for this year’s UN World Oceans Day annual event
											as we hear from thought-leaders, celebrities,
											institutional partners, community voices, entrepreneurs,
											and cross-industry experts about the ...
										</p>
										<Link className='read-more'>Read more {`>`}</Link>
									</>
								}
							/>
						</Card>
					</div>
					<div className='month'>
						<h4>September</h4>
						<Card>
							<Meta
								avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
								title='Card title'
								description={
									<>
										<div className='date'>05 Dec - 10 Dec</div>
										<p>
											Join us for this year’s UN World Oceans Day annual event
											as we hear from thought-leaders, celebrities,
											institutional partners, community voices, entrepreneurs,
											and cross-industry experts about the ...
										</p>
										<Link className='read-more'>Read more {`>`}</Link>
									</>
								}
							/>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Events;
