import React, { Component } from 'react'
import { Form, Input, InputNumber, Radio, Button, message } from 'antd'
import { AddDepartment } from '../../api/department'

export default class Add extends Component {
  state = {
    formLayout: {
      labelCol: {span: 2},
      wrapperCol: {span: 20}
    },
    initiaValues: {
      defaultValue: 0,
      min: 0,
      max: 80
    }
  }

  onSubmit = (value) =>{
    AddDepartment(value).then(
      response =>{
        message.info(response.data.message);
        console.log(response)
      },
      error => {

      }
    )
    console.log(value)
  }
  render() {
    const {formLayout,initiaValues} = this.state
    return (
      <div>
        <Form onFinish={this.onSubmit} {...formLayout}>
          <Form.Item label='部门名称' name='name'>
            <Input></Input>
          </Form.Item>
          <Form.Item label='人员数量' name='number'>
            <InputNumber {...initiaValues}></InputNumber>
          </Form.Item>
          <Form.Item label='禁启用' name='status'>
            <Radio.Group defaultValue={true}>
              <Radio value={false}>禁用</Radio>
              <Radio value={true}>启用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='描述' name='content'>
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>确定</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
