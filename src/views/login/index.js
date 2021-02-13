import React, { Component } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'




export default class Login extends Component {
  state = {loginType: "login"}

  changeLoginType = (value) =>{
    this.setState({loginType:value})
  }
  render() {
    
    return (
      <div>
        {
          this.state.loginType === 'login' 
          ? <LoginForm changeLoginType={this.changeLoginType}/>  
          : <RegisterForm changeLoginType={this.changeLoginType}/>
        }
      </div>
    )
  }
}
