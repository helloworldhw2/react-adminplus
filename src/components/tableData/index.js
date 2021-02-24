import React, { Component, Fragment } from 'react'
import { Table, Row, Col, Button, Pagination } from 'antd'
import { TableList } from '@api/common'


export default class TableComponent extends Component {
  state = {
    data: [],
    loadingTable: false
  }

  componentDidMount() {
    TableList(this.props.tableData.requestData).then(response => {
      const data = response.data.data.data
      if(data){
        this.setState({
          data
        })
      }
      this.setState({loadingTable: false})
    }).catch(error => {
      this.setState({loadingTable: false})
    })
  }
  
  render() {
    const { loadingTable } = this.state
    const { columns,checkBox,rowKey } = this.props.tableData
    const rowSelection = {
      onChange: this.onSelectChange
    }
    return (
      <Fragment>
        <Table pagination= {false} loading={loadingTable} rowSelection={checkBox ? rowSelection : null} columns={columns} dataSource={this.state.data} rowKey={ rowKey || 'id'} bordered></Table>
        <Row>
          <Col span={8}>
          <Button type='primary' onClick={() => {this.onhandlerDelete()}}>批量删除</Button>
          </Col>
          <Col span={16} >
            <Pagination className='pull-right' total={85} showSizeChanger showQuickJumper/>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
