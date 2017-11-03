import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import { Table, Row, Cell } from 'react-responsive-table'
import MenuBar from '../components/MenuBar'

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '<p>Hello %First Name%</p>',
      headers: props.headers,
      idHeaders: null,
      data: props.data
    }
    this.handleChange = this.handleChange.bind(this)
    this.buildIdentifer = this.buildIdentifer.bind(this)
    this.handleTemplate = this.handleTemplate.bind(this)
    this.buildHeaders = this.buildHeaders.bind(this)
    this.replaceAll = this.replaceAll.bind(this)
    this.getSampleData = this.getSampleData.bind(this)
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
    return tableHeads
  }

  handleTemplate () {
    this.setState({ idHeaders: this.buildHeaders().id }, () => this.props.handleTemplate(this.state.text, this.state.idHeaders))
  }

  replaceAll (str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace)
  }

  getSampleData () {
    let preview = this.state.text
    this.state.headers.forEach(head => {
      if (this.buildHeaders().id.includes(`%${head}%`)) {
        preview = this.replaceAll(preview, `%${head}%`, this.state.data[0][head])
      }
    })
    return preview
  }

  render () {
    return (
      <div>
        <MenuBar title='The following are identifers you can use:' />
        <br /><br />
        <div className='md-table'>
          <Table material className='md-table'>
            <Row header key='row'>
              {this.buildIdentifer()}
            </Row>
          </Table>
        </div>
        <br /><br />
        <MenuBar title='Write Your Template' />
        <br /><br />
        <div>
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange} />
        </div>
        <br /><br />
        <MenuBar title='Live Preview' expandable />
        <br /><br />
        <div className='box'>
          <div dangerouslySetInnerHTML={{ __html: this.getSampleData() }} />
        </div>
        <div className='control-buttons'>
          <button onClick={this.handleTemplate}> Preview </button>
        </div>
      </div>
    )
  }
}
