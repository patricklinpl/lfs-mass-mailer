import React, { Component } from 'react'
import { Table, Row, Cell } from 'react-responsive-table'

export default class PreviewContact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      csv: props.data,
      previewData: props.previewData
    }
    this.tableBuilder = this.tableBuilder.bind(this)
    this.getHeaders = this.getHeaders.bind(this)
    this.getRowData = this.getRowData.bind(this)
  }

  tableBuilder (data) {
    const tableArray = []
    if (data.length > 0) {
      const headerRow = <Row header key='row1'>{this.getHeaders(data)}</Row>
      tableArray.push(headerRow)
      for (let i = 0; i < (data.length > 10 ? 10 : data.length); i++) {
        tableArray.push(<Row striped key={`row${i + 2}`}>{this.getRowData(data[i])}</Row>)
      }
    }
    return tableArray.map(row => row)
  }

  getHeaders (data) {
    const headerArray = []
    if (data.length > 0) {
      const headers = Object.keys(data[0])
      for (let i = 0; i < headers.length; i++) {
        headerArray.push(<Cell minWidthPx={100} key={`cell${i + 1}`}>{headers[i]}</Cell>)
      }
    }
    return headerArray.map(head => head)
  }

  getRowData (data) {
    const rowArray = []
    if (data) {
      const headers = Object.keys(data)
      for (let i = 0; i < headers.length; i++) {
        rowArray.push(<Cell minWidthPx={100} key={`cell${i + 1}`}>{data[headers[i]]}</Cell>)
      }
    }
    return rowArray.map(row => row)
  }

  render () {
    return (
      <div>
        <h2>Preview of the First Ten Rows</h2>
        <div className='md-table'>
          <Table material className='md-table'>
            {this.tableBuilder(this.state.csv)}
          </Table>
          <br />
          <div className='control-buttons'>
            <button onClick={this.props.writeTemplate}> Next </button>
          </div>
        </div>
      </div>
    )
  }
}
