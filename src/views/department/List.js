import React, { Component,Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Input, Switch, message, Modal } from 'antd'
import { Delete, Status } from '@api/department'
import TableComponent from '@/components/tableData'
import requestUrl from '@api/requestUrl'

export default class Department extends Component {
  state = {
    id: '',
    did: '',
    tableData: {
      checkBox: true,
      requestData:{
        data: {
          pageNumber: 1,
          pageSize: 10,
          keyWord: '',
        },
        url: requestUrl.departmentList,
      },
      columns: [
        { title: '部门名称', dataIndex: 'name', key: 'name' },
        { 
          title: '禁启用', 
          dataIndex: 'status', 
          key: 'status' ,
          render: (text, rowData) => {
            return <Switch loading={rowData.id === this.state.did} onClick={()=>{this.onHandlerSwitch(rowData)}} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
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
    },
    
    data: [],
    name: '',
    visible: false,
    loadingTable: false,
    confirmLoading: false,
    selectedRowKeys: [],
    
  

  }

  

  onHandlerSwitch(data){
    this.setState({did: data.id})
    Status({id: data.id,status: data.status ? false : true}).then(
      response => {
        this.setState({did: ''})
        message.info(response.data.message)
        this.loadData()
      }
    ).catch(error =>{
      this.setState({did: ''})
    })
  } 
  
  

  onhandlerDelete(id){
    if(!id) {
      if(this.state.selectedRowKeys.length === 0){
        return
      }
      id = this.state.selectedRowKeys.join()
    }
    this.setState({visible: true, id})
  }

  
  onFinish = (value) => {
    if(this.state.loadingTable){
      return
    }
    this.setState({name: value.name})
    this.loadData()
  }

  
  modalThen = () => {
    this.setState({confirmLoading: true})
    Delete({id: this.state.id}).then(
      response => {
        message.info(response.data.message)
        this.setState({visible: false, confirmLoading: false, selectedRowKeys: []})
      }
    )
  }

  onSelectChange = selectedRowKeys => {
    if(!selectedRowKeys) {
      return
    }
    this.setState({selectedRowKeys})
  };

  
 

  render() {

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
          <TableComponent tableData={this.state.tableData}/>
          <Button type='primary' onClick={() => {this.onhandlerDelete()}}>批量删除</Button>
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
