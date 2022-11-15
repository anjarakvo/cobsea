import { Button } from 'antd';
import FullMenu from 'components/full-menu/full-menu';
import MenuBar from 'components/menu';
import React from 'react';
import './style.scss'

const Home = () => {
	return (
    <div id="landing">
      <div className="hero">
			  <MenuBar landing />
        <div className="ui container">
          <h1>East Asian Seas Regional Node</h1>
          <div className="gpml">
            <span>of the</span><img src="/gpml.svg" alt="GPML" />
          </div>
          <h4>The web platform of the Regional Node provides stakeholders in the East Asian Seas region with access to knowledge, resources and networking services on marine litter and plastic pollution for informed action.</h4>
          <Button type="ghost" size="large">{`Read more`}</Button>
        </div>
      </div>
      <div className="menu-section">
        <div className="ui container">
          <FullMenu />
        </div>
      </div>
    </div>
  );
};


export default Home;
