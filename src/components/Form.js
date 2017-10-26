import React, { Component } from 'react'

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      files: null
    }
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

  handleFileSelect (event) {
    this.setState({ files: event.target.files[0] })
  }

  render () {
    return (
      <div>
        <div className='form'>
          <form onSubmit={this.props.handleUpload(this.state)}>
            <div> <input type='file' name='file' ref='file' onChange={this.handleFileSelect} /> 10mb file upload limit </div>
            <div />
            <div style={{ textAlign: 'center' }}>
              <br /><br />
              <input className='btn' type='submit' value='Upload' />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
