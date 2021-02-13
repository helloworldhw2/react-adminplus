import React, { Component,Fragment } from 'react'
import './index.less'

import { Form, Input, Button,Row, Col,message } from 'antd';
import { UserOutlined,LockOutlined,CheckOutlined  } from '@ant-design/icons';
// import { validate_password,validate_email } from '../../utils/validate'
import { Login,Code } from '../../api/account'

export default class LoginForm extends Component {
  state = {
    // code_button_disabled: true,
    code_button_loading: false,
    code_button_disabled: false,
    code_button_text: '获取验证码'
  }
  onFinish = (values) => {
    Login(values).then(response => {
      console.log("object")
    }).catch(error => {
      
    })
  };
  changeLoginType = () =>{
    this.props.changeLoginType("register")
  }

  getCode = () =>{
    const username =  this.username.state.value
    console.log(username)
    if(username === undefined){
      message.warning('用户名未填写',1);
      return
    } 
    this.setState({code_button_loading: true})
    this.setState({code_button_text: "发送中"})
    const requestPram = {
      username,
      module: 'login'
    }
    Code(requestPram).then(
      response =>{
        this.countDown()
      },
      error => {
        this.setState({code_button_loading: false})
        this.setState({code_button_text: "重新发送"})
      }
    )
  }
  countDown = () =>{
    let sec = 5;
    this.setState({
      code_button_loading: false,
      code_button_disabled: true,
      code_button_text: `${sec}S`
    })
    const timer = setInterval(() =>{
      if(sec <= 1){
        this.setState({
          code_button_disabled: false,
          code_button_text: '重新获取'
        });
        clearInterval(timer);
        return
      } 
      this.setState({code_button_text: `${--sec}S`})
    },1000)
    
  }
  render() {
    // const _this = this;
    // const { code_button_disabled,code_button_loading } = this.state
    const { code_button_loading,code_button_text,code_button_disabled } = this.state
    return (
      <Fragment>
        <div className="form-wrap">
          <div>
            <div className='form-header'>
              <h4 className='column'>登陆</h4>
              <span  onClick={this.changeLoginType}>帐号注册</span>
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
                  {required: true,message: '请输入邮箱!'},
                  {type: "email",message: '邮箱格式有误!'},
                  // ({ getFieldValue }) => ({
                  //   validator(_, value) {
                  //     if(validate_email(value)) {
                  //       _this.setState({disabled:false})
                  //       return Promise.resolve();
                  //     }else {
                  //       return Promise.reject('邮箱格式有误!');
                  //     }
                  //   },
                  // }),
                ]
              } >
              <Input ref={e => this.username = e} prefix={<UserOutlined className="site-form-item-icon" />} 
                  placeholder="email" />
              </Form.Item>
              <Form.Item name="password" rules={
                [
                  // {required: true,message: '密码不能为空!'},
                  // {pattern: validate_password,message: '请输入大于6位小于20位的数字+字母!'},
                  {min: 6,message: '密码不能小于6位!'},
                  {max: 20,message: '密码不能大于20位!'},
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value.length < 6) {
                        return Promise.reject('密码不能小于6位!');
                      }
                    },
                  }),
                ]
              } >
              <Input prefix={<LockOutlined className="LockOutlined" />} 
                  placeholder="字母+数字,大于6位,小于20位" />
              </Form.Item>
              <Form.Item name="code" rules={
                [
                  {required: true,message: '验证码不能为空!'},
                  {len: 6,message: '验证码必须为6位!'}
                ]
              } >
                <Row gutter={13}>
                  <Col span={15}>
                    <Input prefix={<CheckOutlined className="LockOutlined" />} 
                    placeholder="code" />
                  </Col>
                  <Col span={9}>
                    {/* <Button type="danger" onClick={this.getCode} block disabled={code_button_disabled}>获取验证码</Button> */}
                    <Button type="danger" disabled={code_button_disabled} onClick={this.getCode} block loading={code_button_loading}>{code_button_text}</Button>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                  登陆
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Fragment>
    )
  }
}
