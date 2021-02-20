import React, { Component,Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Input, Table, Switch, message, Modal } from 'antd'
import { GetList, Delete, Status } from '@api/department'

export default class Department extends Component {
  state = {
    id: '4442',
    columns: [
      { title: '部门名称', dataIndex: 'name', key: 'name' },
      { 
        title: '禁启用', 
        dataIndex: 'status', 
        key: 'status' ,
        render: (text, rowData) => {
          return <Switch isloading={rowData.id == this.state.id} onClick={()=>{this.onHandlerSwitch(rowData)}} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
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
              {/* <Button onClick={() => {this.onhandlerEdit(rowData.id)}} type='primary' size='small'>编辑 */}
              <Button type='primary' size='small'>
                <Link to={{ pathname: '/index/department/add', state: {id: rowData.id}}}>编辑</Link>
              </Button>
              <Button onClick={() => {this.onhandlerDelete(rowData.id)}} type='danger' size='small'>删除</Button>
            </div>
          )
        }
      }
    ],
    data: [],
    name: '',
    visible: false,
    
    confirmLoading: false

  }

  componentDidMount() {
    this.loadData()
  }

  onHandlerSwitch(data){
   
    Status({id: data.id,status: data.status ? false : true}).then(
      response => {
        message.info(response.data.message)
        this.loadData()
      }
    )
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

  onhandlerDelete(id){
    if(!id) {
      return
    }
    this.setState({visible: true, id})
  }

  onhandlerEdit(id){
    // console.log(id)
  } 
  
  onFinish = (value) => {
    this.setState({name: value.name})
    this.loadData()
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // this.setState({ selectedRowKeys });
  };

  modalThen = () => {
    this.setState({confirmLoading: true})
    Delete({id: this.state.id}).then(
      response => {
        message.info(response.data.message)
        this.setState({visible: false, confirmLoading: false})
        this.loadData()
      }
    )
  }

 

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
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.modalThen}
          onCancel={ () => {this.setState({visible: false})} }
          confirmLoading={this.state.confirmLoading}
          okText="确认"
          cancelText="取消"
        >
          <p className='text-center'>确认删除此信息？<strong>删除后将无法回复。</strong></p>
        </Modal>
      </Fragment>
    )
  }
}
