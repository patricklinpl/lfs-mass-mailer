import React, { Component } from 'react'
import { Table, Row, Cell } from 'react-responsive-table'

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = { files: null }
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

  handleFileSelect (event) {
    this.setState({ files: event.target.files[0] })
  }

  render () {
    return (
      <div className='form'>
        <form onSubmit={this.props.handleUpload(this.state)}>
          <div className='md-table'>
            <Table material className='md-table'>
              <Row key='row'>
                <Cell minWidthPx={50} key={`cell`}>Please upload a properly formatted .csv file. A example template file can be found <a href='http://www.yahoo.com' target='_blank'>here</a>. Files must be under 10mb. All other file types are rejected.</Cell>
              </Row>
              <Row key='row'>
                <Cell minWidthPx={50} key={`cell`}><input type='file' name='file' ref='file' onChange={this.handleFileSelect} /></Cell>
                <br />
              </Row>
              <Row key='row'>
                <Cell minWidthPx={50} key={`cell`}><input className='btn' type='submit' value='Upload' /></Cell>
              </Row>
            </Table>
          </div>
        </form>
      </div>
    )
  }
}
