import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Spin, notification } from 'antd';
import axios from 'axios';
import { getStrapiUrl } from 'utils/misc';

function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      setLoading(true);
      try {
        const strapiURL = getStrapiUrl();
        const response = await axios.get(`${strapiURL}/api/about?populate=*`);

        if (response.data.data) {
          setAboutData(response.data.data.attributes);
        }
      } catch (error) {
        notification.error({
          message:
            error.response?.data?.error?.message ||
            'Failed to fetch about us data',
        });
        console.error('Error fetching about us data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  return (
    <div className="about-us-page">
      {loading && (
        <div className="about-us-loading">
          <Spin size="large" />
        </div>
      )}
      {!loading && !aboutData && (
        <div className="about-us-error">
          <h2>Unable to load content</h2>
          <p>Please try again later.</p>
        </div>
      )}
      <div className="container">
        <div className="about-us-content">
          {aboutData?.title && (
            <h1 className="about-us-title">{aboutData?.title}</h1>
          )}

          {aboutData?.content && (
            <div
              className="about-us-body"
              dangerouslySetInnerHTML={{ __html: aboutData.content }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
