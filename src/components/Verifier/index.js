import React, { Component } from 'react'
import { Button,message } from 'antd';
import { validate_email } from '../../utils/validate'
import { Code } from '../../api/account'

let timer = null;

export default class Verifier extends Component {
  state = {
    // code_button_disabled: true,
    code_button_loading: false,
    code_button_disabled: false,
    code_button_text: '获取验证码',
    flag:true
  }
  getCode = () =>{
    if(!this.state.flag) return
    const username =  this.props.username
    const module =  this.props.module
    if(username === ''){
      message.warning('邮箱未填写',1);
      return
    } 
    if(!validate_email(username)){
      message.warning('邮箱格式不正确',1);
      return
    } 
    this.setState({
      code_button_loading: true,
      code_button_text: "发送中",
      flag: false
    })
    const requestPram = {
      username,
      module
    }
    Code(requestPram).then(
      response =>{
        message.success(response.data.message)
        this.countDown()
      },
      error => {
        this.setState({
          code_button_loading: false,
          code_button_text: "重新发送",
          flag: true
        })
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
    timer = setInterval(() =>{
      if(sec <= 1){
        this.setState({
          code_button_disabled: false,
          code_button_text: '重新获取',
          flag: true
        });
        clearInterval(timer);
        return
      } 
      this.setState({code_button_text: `${--sec}S`})
    },1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  
  
  
  render() {
    const { code_button_loading,code_button_text,code_button_disabled } = this.state
    return (
      <Button type="danger"  disabled={code_button_disabled} onClick={this.getCode} block loading={code_button_loading}>{code_button_text}</Button>
    )
  }
}
