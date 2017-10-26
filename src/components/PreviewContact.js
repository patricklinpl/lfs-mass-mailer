import React, { Component } from 'react'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Table, Row, Cell } from 'react-responsive-table'

export default class PreviewContact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      csv: props.data
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
      for (let i = 0; i < data.length; i++) {
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
      console.log(headers)
      for (let i = 0; i < headers.length; i++) {
        rowArray.push(<Cell minWidthPx={100} key={`cell${i + 1}`}>{data[headers[i]]}</Cell>)
      }
    }
    return rowArray.map(row => row)
  }

  render () {
    return (
      <div className='md-table'>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Table material className='md-table'>
            {this.tableBuilder(this.state.csv)}
          </Table>
        </MuiThemeProvider>
      </div>
    )
  }
}
