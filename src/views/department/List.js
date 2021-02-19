import React, { Component,Fragment } from 'react'
import { Form, Button, Input, Table, Switch, message } from 'antd'
import { GetList, Delete } from '@api/department'

export default class Department extends Component {
  state = {
    columns: [
      { title: '部门名称', dataIndex: 'name', key: 'name' },
      { 
        title: '禁启用', 
        dataIndex: 'status', 
        key: 'status' ,
        render: (text, rowData) => {
          return <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
        }
      },
      { title: '人员数量', dataIndex: 'number', key: 'number' },
      { 
        title: '操作', 
        dataIndex: 'moment', 
        key: 'moment',
        render: (text, rowData) => {
          return (
            <div className='inline-button'>
              <Button type='primary' size='small'>编辑</Button>
              <Button onClick={() => {this.handleDelete(rowData.id)}} type='danger' size='small'>删除</Button>
            </div>
          )
        }
      }
    ],
    data: [],
    name: ''

  }

  componentDidMount() {
    this.loadData()
  }
  
  loadData = () =>{
    const requestData = {
      pageNumber: 1,
      pageSize: 10
    }
    if(this.state.name){
      requestData.name = this.state.name
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

  handleDelete = (id) =>{
    if(!id) {
      return
    }
    Delete({id}).then(
      response => {
        message.info(response.data.message)
        this.loadData()
      }
    )
  }
  
  onFinish = (value) => {
    this.setState({name: value.name})
    this.loadData()
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // this.setState({ selectedRowKeys });
  };

  render() {
    const { columns,data } = this.state
    const rowSelection = {
      onChange: this.onSelectChange
    }

    return (
      <Fragment>
        <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item label='部门名称' name='name'>
            <Input placeholder='请输入部门名称' ></Input>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>搜索</Button>
          </Form.Item>
        </Form>
        <div className='table-wrap'>
          <Table rowSelection={rowSelection} rowKey='id' columns={columns} dataSource={data} bordered> </Table>
        </div>
      </Fragment>
    )
  }
}
