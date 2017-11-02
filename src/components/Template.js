import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import { Table, Row, Cell } from 'react-responsive-table'

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '<p>Hello %First Name%</p>',
      headers: props.headers,
      idHeaders: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.buildIdentifer = this.buildIdentifer.bind(this)
    this.handleTemplate = this.handleTemplate.bind(this)
    this.buildHeaders = this.buildHeaders.bind(this)
  }

  handleChange (value) {
    this.setState({ text: value })
  }

  buildHeaders () {
    const tableHeads = []
    const idHeads = []
    this.state.headers.forEach(head => {
      const id = `%${head}%`
      idHeads.push(id)
      tableHeads.push(<Cell minWidthPx={50} key={`cell`}>{id}</Cell>)
    })
    return {
      table: tableHeads,
      id: idHeads
    }
  }

  buildIdentifer () {
    const tableHeads = this.buildHeaders().table
    return tableHeads.map(row => row)
  }

  handleTemplate () {
    this.setState({ idHeaders: this.buildHeaders().id }, () => this.props.handleTemplate(this.state.text, this.state.idHeaders))
  }

  render () {
    return (
      <div>
        <p>The following are identifers you can use:</p>
        <div className='md-table'>
          <Table material className='md-table'>
            <Row header key='row'>
              {this.buildIdentifer()}
            </Row>
          </Table>
        </div>
        <div>
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange} />
        </div>
        <div className='control-buttons'>
          <button onClick={this.handleTemplate}> Preview </button>
        </div>
      </div>
    )
  }
}
