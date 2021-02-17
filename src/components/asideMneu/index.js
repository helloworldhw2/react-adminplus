import React, { Component,Fragment } from 'react'
import {Link,withRouter} from 'react-router-dom'
import './index.less'
import Route from '../../router'
import { Menu } from 'antd';
import { UserOutlined,UserSwitchOutlined } from '@ant-design/icons';
// import { validate_password,validate_email } from '../../utils/validate'
const { SubMenu } = Menu;

class asideMneu extends Component {
  state = {
    selectedKeys: '',
    openKeys: ''
  }
  randerSubMenu = ({key,title,children,icon}) =>{
    return (
      <SubMenu key={key} title={title} icon={<UserSwitchOutlined />}>
        {
          children && children.map((menu) =>{
            return menu.children && menu.children.length > 0 ? this.randerSubMenu(menu) : this.randerMenu(menu)
          })
        }
      </SubMenu>
    )
  }

  randerMenu = ({key,title}) =>{
    return (
      <Menu.Item key={key} ><UserOutlined />
        <Link to={key}>{title}</Link>
      </Menu.Item>
    )
  }

  componentDidMount() {
    const pathname = this.props.location.pathname;
    const menuHigh = {
      selectedKeys: pathname,
      openKeys: pathname.split('/').slice(0,3).join('/')
    }
    this.selectMenuHigh(menuHigh)
      
    
  }

  selectMenu = ({ item, key, keyPath, domEvent }) =>{
    const menuHigh = {
      selectedKeys: key,
      openKeys: keyPath[keyPath.length-1]
    }
    this.selectMenuHigh(menuHigh)   
  }

  selectMenuHigh = ({selectedKeys,openKeys}) =>{
    this.setState({
      selectedKeys,
      openKeys
    })
  }

  onOpenChange = (openKeys) =>{
    this.setState({
      openKeys:  openKeys[1]
    });
  }
  

  render() {
    const {selectedKeys,openKeys} = this.state
    return (
      <Fragment>
        <Menu
          onClick={this.selectMenu}
          onOpenChange={this.onOpenChange}
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKeys]}
          openKeys={[openKeys]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            Route.map((menu) =>{
              return menu.children ? this.randerSubMenu(menu) : this.randerMenu(menu)
            })
          }
        </Menu>
      </Fragment>
    )
  }
}

export default  withRouter(asideMneu)
