import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Table, Row, Cell } from 'react-responsive-table'

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '<p>Hello %First Name%</p>',
      headers: props.headers
    }
    this.handleChange = this.handleChange.bind(this)
    this.buildIdentifer = this.buildIdentifer.bind(this)
    this.handleTemplate = this.handleTemplate.bind(this)
  }

  handleChange (value) {
    this.setState({ text: value })
  }

  buildIdentifer () {
    const idHeads = []
    this.state.headers.forEach(head => {
      idHeads.push(<Cell minWidthPx={50} key={`cell`}>{`%${head}%`}</Cell>)
    })
    return idHeads.map(row => row)
  }

  handleTemplate () {
    this.props.handleTemplate(this.state.text)
  }

  render () {
    return (
      <div>
        <p>The following are identifers you can use:</p>
        <div className='md-table'>
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <Table material className='md-table'>
              <Row header key='row'>
                {this.buildIdentifer()}
              </Row>
            </Table>
          </MuiThemeProvider>
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
