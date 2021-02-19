import React, { Component,Fragment } from 'react'
import { Form, Button, Input, Table } from 'antd'
import { GetList } from '../../api/department'

export default class Department extends Component {
  state = {
    columns: [
      { title: '部门名称', dataIndex: 'name', key: 'name' },
      { title: '禁启用', dataIndex: 'status', key: 'status' },
      { title: '人员数量', dataIndex: 'number', key: 'number' },
      { title: '操作', dataIndex: 'moment', key: 'moment' }
    ],
    data: [
      { key:'1', name: 'yuming', number: 32, status: true}
    ]

  }

  componentDidMount() {
    const requestData = {
      pageNumber: 1,
      pageSize: 10
    }
    GetList(requestData).then(response => {
      const data = response.data.data.data
      if(data){
        this.setState({
          data
        })
      }
     
    })
      
  }
  
  
  onFinish = (value) => {
    console.log(value)

  }
  render() {
    const { columns,data } = this.state
    return (
      <Fragment>
        <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item label='部门名称' name='departname'>
            <Input placeholder='请输入部门名称' ></Input>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>搜索</Button>
          </Form.Item>
        </Form>
        <Table rowKey='id' columns={columns} dataSource={data}>
          
        </Table>
      </Fragment>
    )
  }
}
