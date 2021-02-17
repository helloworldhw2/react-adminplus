import React, { Component,Fragment } from 'react'
import { Form, Input, Button,Row, Col,message } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import CryptoJs from 'crypto-js'
import './index.less'
import { Register } from '../../api/account'
import Verifier from '../../components/Verifier'
import { validate_password } from '../../utils/validate'

export default class RegisterForm extends Component {
  state = {
    username: '',
    code: ''
  }
 
  onFinish = (values) => {
    const { username,password } = values
    const requestData = {
      username,
      password: CryptoJs.MD5(password).toString(),
      code: this.state.code
    }
    Register(requestData).then(
      response  =>{
        if(response.data.resCode === 0){
          this.changeLoginType()
          return
        }
          message.error(response.data.message);
        
      },
      error => {

      }
    )
  }
  changeLoginType = () =>{
    this.props.changeLoginType("login")
  }

  changeUsername = (event) =>{
    this.setState({username:event.target.value})
  }

  changeRegisterCode = (event) =>{
    this.setState({code:event.target.value})
  }

  getReturnCode = (code) => {
    this.setState({code})
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
              <Form.Item name="username" rules={
                [ 
                  {required: true,message: '邮箱不能为空!',},
                  {type: "email",message: '邮箱格式有误!'},
                ]
              } >
              <Input  onChange={this.changeUsername} prefix={<UserOutlined className="site-form-item-icon" />} 
                  placeholder="Username" />
              </Form.Item>
              <Form.Item name="password" rules={
                [
                  {required: true,message: '密码不能为空!',},
                  {pattern: validate_password,message: '密码不为字母+数字,大于6位,小于20位!',},
                ]} 
                hasFeedback
              >
              <Input type='password' prefix={<LockOutlined className="LockOutlined" />} 
                  placeholder="Password" />
              </Form.Item>
              <Form.Item name="confirm" hasFeedback  dependencies={['password']} rules={
                [
                  {required: true,message: '密码不能为空!',},
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('两次密码输入不一致!');
                    },
                  }),
                ]
              } >
              <Input type='password' prefix={<LockOutlined className="LockOutlined" />} 
                  placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item name="code" rules={
                [
                  {required: true,message: '请输入验证码!',},
                  {len: 6,message: '验证码必须为6位!',},
                ]
              } >
                <Row gutter={13}>
                  <Col span={15}>
                    <Input onChange={this.changeRegisterCode} prefix={<LockOutlined className="LockOutlined" />} 
                    placeholder="Code" />
                  </Col>
                  <Col span={9}>
                    <Verifier username={this.state.username} module='register' getReturnCode={this.getReturnCode}/>
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
