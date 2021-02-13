import React, { Component,Fragment } from 'react'
import { Form, Input, Button,Row, Col } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import './index.less'

export default class RegisterForm extends Component {
 
  onFinish = (values) => {
    console.log('Received values of form: ', values);
  }
  changeLoginType = () =>{
    this.props.changeLoginType("login")
  }
 
  render() {
    return (
      <Fragment>
        <div className="form-wrap">
          <div>
            <div className='form-header'>
              <h4 className='column'>注册</h4>
              <span onClick={this.changeLoginType}>帐号登陆</span>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
            >
              <Form.Item name="username" rules={[{required: true,message: 'Please input your Username!',},]} >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                  placeholder="Username" />
              </Form.Item>
              <Form.Item name="Password" rules={[{required: true,message: 'Please input your Password!',},]} >
              <Input prefix={<LockOutlined className="LockOutlined" />} 
                  placeholder="Password" />
              </Form.Item>
              <Form.Item name="Password" rules={[{required: true,message: 'Please input your Password!',},]} >
              <Input prefix={<LockOutlined className="LockOutlined" />} 
                  placeholder="Password" />
              </Form.Item>
              <Form.Item name="Password" rules={[{required: true,message: 'Please input your Password!',},]} >
                <Row gutter={13}>
                  <Col span={15}>
                    <Input prefix={<LockOutlined className="LockOutlined" />} 
                    placeholder="code" />
                  </Col>
                  <Col span={9}>
                    <Button type="danger" block>获取验证码</Button>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                  注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Fragment>
    )
  }
}
