import React, { Component } from 'react'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
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
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
              <Table material className='md-table'>
                <Row key='row'>
                  <Cell minWidthPx={50} key={`cell`}><input type='file' name='file' ref='file' onChange={this.handleFileSelect} /></Cell>
                  <br />
                </Row>
                <Row key='row'>
                  <Cell minWidthPx={50} key={`cell`}><input className='btn' type='submit' value='Upload' /></Cell>
                </Row>
              </Table>
            </MuiThemeProvider>
          </div>
        </form>
      </div>
    )
  }
}
