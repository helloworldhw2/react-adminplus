import React, { Component } from 'react'
import { MenuFoldOutlined,MenuUnfoldOutlined  } from '@ant-design/icons'
import '../../../components/asideMneu/index.less'


export default class Header extends Component {
  state = {
    collapsed: this.props.collapsed
  }
  menuClose = () =>{
    this.props.toggleChange()
  }
  render() {
    return (
      
      <div className={this.props.collapsed ? 'collapsed-close' : ''}>
        <h1 className='logo'><span>aside</span></h1>
        <div className='head-warp'>
          <span onClick={this.menuClose} className='collapsed-icon'>{this.props.collapsed ? <MenuUnfoldOutlined  /> :<MenuFoldOutlined  />}</span>
        </div>
      </div>
    )
  }
}
