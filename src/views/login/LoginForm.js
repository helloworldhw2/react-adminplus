import React, { Component,Fragment } from 'react'
import {withRouter} from 'react-router-dom'
import './index.less'
import CryptoJs from 'crypto-js'
import { Form,Input,Button,Row,Col,message } from 'antd';
import { UserOutlined,LockOutlined,CheckOutlined  } from '@ant-design/icons';
// import { validate_password,validate_email } from '../../utils/validate'
import { Login } from '../../api/account'
import { setToken } from '../../utils/session'
import Verifier from '../../components/Verifier'
class LoginForm extends Component {
  state = {
    username:'',
    login_button_loading: false
  }
  onFinish = (values) => {
    this.setState({login_button_loading: true})
    const { username,password,code } = values
    const requestData = {
      username,
      password: CryptoJs.MD5(password).toString(),
      code
    }
    Login(requestData).then(response => {
      this.setState({login_button_loading: false})
      if(response.data.resCode === 0){
        setToken(response.data.data.token)
        this.props.history.push('/index')
        return 
      }
      message.error(response.data.message)
      return
    }).catch(error => {
      message.error("网络延迟请重试!")
      this.setState({login_button_loading: false})
    })
  };
  changeLoginType = () =>{
    this.props.changeLoginType("register")
  }

  changeUsername = (event) =>{
    this.setState({username:event.target.value})
  }

  render() {
    // const _this = this;
    const { login_button_loading } = this.state
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
              <Input onChange={this.changeUsername} prefix={<UserOutlined className="site-form-item-icon" />} 
                  placeholder="email" />
              </Form.Item>
              <Form.Item name="password" rules={
                [
                  // {required: true,message: '密码不能为空!'},
                  // {pattern: validate_password,message: '请输入大于6位小于20位的数字+字母!'},
                  {min: 6,message: '密码不能小于6位!'},
                  {max: 20,message: '密码不能大于20位!'},
                  // ({ getFieldValue }) => ({
                  //   validator(_, value) {
                  //     if (value.length < 6) {
                  //       return Promise.reject('密码不能小于6位!');
                  //     }
                  //   },
                  // }),
                ]
              } >
              <Input type='password' prefix={<LockOutlined className="LockOutlined" />} 
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
                    {/* <div style={{color:"#fff"}} onClick={this.getCode}>{code_button_text}</div> */}
                    <Verifier username={this.state.username} module='login'/>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={login_button_loading} className="login-form-button" block>
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

export default withRouter(LoginForm) 