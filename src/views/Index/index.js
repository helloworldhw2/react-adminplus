import React, { Component } from 'react'
import './layout.less'
import { Layout } from 'antd';
import LayoutAside from './components/Aside'
import LayoutHeader from './components/Header'
import ContainerMain from '../../components/containerMain'
const { Header,Sider,Content } = Layout;


export default class index extends Component {
  state = {
    collapsed: false
  }

  componentDidMount() {
    const collapsed = JSON.parse(sessionStorage.getItem("collapsed"))
    this.setState({
      collapsed
    })
  }
  

  toggleCollapsed = () =>{
    const collapsed = !this.state.collapsed
    this.setState({
      collapsed
    })
    sessionStorage.setItem("collapsed",collapsed)
  }
  render() {
    return (
      <div>
        <Layout className='layout-wrap'>
          <Header className='layout-header' ><LayoutHeader collapsed={this.state.collapsed} toggleChange={this.toggleCollapsed}/></Header>
          <Layout>
            <Sider width='250px' collapsed={this.state.collapsed}><LayoutAside/></Sider>
            <Content className='layou-content'>
              <ContainerMain/>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
