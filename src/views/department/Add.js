import React, { Component } from 'react'
import { Form, Input, InputNumber, Radio, Button, message } from 'antd'
import { AddDepartment, Detailed, EditDepartment } from '@api/department'

export default class Add extends Component {
  state = {
    formLayout: {
      labelCol: {span: 2},
      wrapperCol: {span: 20}
    },
    initiaValues: {
      min: 0,
      max: 80,
    },
    loading: false
  }

  onSubmit = (value) =>{
    if(!value.name) {
      message.error("部门名称不能为空！")
      return
    } 
    if(!value.number ) {
      message.error("人员数量不能为0！")
      return
    } 
    if(!value.content ) {
      message.error("描述不能为空！")
      return
    } 
    this.setState({loading: true})
    this.props.location.state.id ? this.onHanderEdit(value) : this.onHanderAdd(value)
  }

  onHanderAdd(value){
    AddDepartment(value).then(
      response =>{
        message.info(response.data.message);
        this.setState({loading: false})
        this.form.resetFields()
      },
      error => {
        this.setState({loading: false})
      }
    )
  }

  onHanderEdit(value){
    value.id = this.props.location.state.id
    EditDepartment(value).then(
      response =>{
        message.info(response.data.message);
        this.setState({loading: false})
      },
      error => {
        this.setState({loading: false})
      })
  }

  componentDidMount() {
    this.getDetailed()
  }

  getDetailed = () => {
    if( !this.props.location.state){
      return
    }
    Detailed({id: this.props.location.state.id}).then(
      response =>{
        this.form.setFieldsValue(response.data.data)
      },
      error => {
      }
    )
  }
  
  render() {
    const {formLayout,initiaValues} = this.state
    return (                           
        <Form ref={e => this.form = e} onFinish={this.onSubmit} initialValues={{status: true, number: 0}} {...formLayout} >
          <Form.Item label='部门名称' name='name'>
            <Input></Input>
          </Form.Item>
          <Form.Item label='人员数量' name='number'>
            <InputNumber {...initiaValues}></InputNumber>
          </Form.Item>
          <Form.Item label='禁启用' name='status'>
            <Radio.Group>
              <Radio value={false}>禁用</Radio>
              <Radio value={true}>启用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='描述' name='content'>
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <Button loading={this.state.loading} type='primary' htmlType='submit'>确定</Button>
          </Form.Item>
        </Form>
    )
  }
}
