import React, { useState } from 'react';
import './styles.scss';
import api from 'utils/api';
import { Row, Col, Form, Input, Button, notification } from 'antd';
const { TextArea } = Input;

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onsubmit = async (values) => {
    setLoading(true);
    const data = {
      ...values,
      source: 'cobsea',
    };

    try {
      await api.post('/contact', data);
      notification.success({
        message: 'Contact form successfully submitted',
        description:
          'Thank you for reaching out. We will get back to you soon.',
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'An error occurred',
        description: 'Please try again later or contact us directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="contact-us-page">
      <div className="contact-us-content">
        <h1 className="contact-us-title">Contact Us</h1>

        <div className="contact-intro">
          <p>
            Have questions about the COBSEA Regional Node or want to get
            involved? We'd love to hear from you. Fill out the form below and
            our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="contact-form-container">
          <Row gutter={[32, 0]}>
            <Col xs={24} lg={14}>
              <div className="form-section">
                <Form
                  form={form}
                  name="contact"
                  layout="vertical"
                  onFinish={onsubmit}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  className="contact-form"
                >
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your name!',
                          },
                          {
                            min: 2,
                            message: 'Name must be at least 2 characters!',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your full name"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                          {
                            type: 'email',
                            message: 'Please enter a valid email!',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter your email address"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="organization"
                    label="Organization"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your organisation!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your organization name"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[
                      { required: true, message: 'Please input your subject!' },
                      {
                        min: 5,
                        message: 'Subject must be at least 5 characters!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter the subject of your message"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[
                      { required: true, message: 'Please input your message!' },
                      {
                        min: 10,
                        message: 'Message must be at least 10 characters!',
                      },
                    ]}
                  >
                    <TextArea
                      rows={6}
                      placeholder="Enter your detailed message here..."
                      showCount
                      maxLength={1000}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      ghost
                      htmlType="submit"
                      loading={loading}
                      size="large"
                      className="submit-button"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
