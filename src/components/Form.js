import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
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
    const styles = {
      button: {
        margin: 12
      },
      fileInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0
      }
    }
    return (
      <div className='form'>
        <form onSubmit={this.props.handleUpload(this.state)}>
          <div className='md-table'>
            <Table material className='md-table'>
              <Row key='row'>
                <Cell minWidthPx={50} key={`cell`}>Please upload a properly formatted .csv file. A example template file can be found <a href='http://www.yahoo.com' target='_blank'>here</a>. Files must be under 10mb. All other file types are rejected.</Cell>
              </Row>
              <Row key='row'>
                <Cell minWidthPx={50} key={`cell`}>
                  <RaisedButton
                    label='Choose a File'
                    labelPosition='before'
                    style={styles.button}
                    containerElement='label'>
                    <input type='file' name='file' ref='file' onChange={this.handleFileSelect} style={styles.fileInput} />
                  </RaisedButton>
                  {!this.state.files ? null : this.state.files.name}
                </Cell>
                <br />
              </Row>
              <Row key='row'>
                <Cell minWidthPx={50} key={`cell`}>
                  <RaisedButton
                    label='Upload'
                    labelPosition='before'
                    primary
                    style={styles.button}
                    containerElement='label'>
                    <input type='submit' value='Upload' style={styles.fileInput} />
                  </RaisedButton>
                </Cell>
              </Row>
            </Table>
          </div>
        </form>
      </div>
    )
  }
}
