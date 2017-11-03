/* global XMLHttpRequest, FormData, alert */
import React, { Component } from 'react'
import Form from '../components/Form'
import PreviewContact from '../components/PreviewContact'
import Template from '../components/Template'
import PreviewTemplate from '../components/PreviewTemplate'
import Loading from '../components/Loading'

export default class Controller extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadCSV: false,
      previewData: false,
      uploadTemplate: false,
      previewTemplate: false,
      headers: null,
      emailHeader: null,
      tempHeaders: null,
      data: null,
      template: null,
      loading: false
    }
    this.getHeaders = this.getHeaders.bind(this)
  }

  getHeaders (data) {
    Array.isArray(data) && this.setState({ headers: Object.keys(data[0]) })
  }

  handleUpload (state) {
    return event => {
      event.preventDefault()
      const xhr = new XMLHttpRequest()
      let FD = new FormData()
      for (let name in state) {
        FD.append(name, state[name])
      }
      this.setState({ loading: true })
      xhr.onload = () => {
        if (xhr.readyState === 4) {
          const response = JSON.parse(xhr.response)
          if (xhr.status === 200) {
            if (response.csv) {
              this.getHeaders(response.csv)
              this.setState({ uploadCSV: true, data: response.csv, previewData: true, loading: false })
            }
          } else if (xhr.status === 404) {
            this.setState({ loading: false })
            if (typeof response.msg.code === 'undefined') {
              if (typeof response.msg.storageErrors === 'undefined') {
                alert('Error: ' + response.msg)
              } else {
                alert('Error: Unsupported File Type! ')
              }
            } else {
              alert('Error: File is too large!')
            }
          }
        }
      }
      xhr.open('POST', 'api/form')
      xhr.send(FD)
    }
  }

  writeTemplate () {
    if (!this.state.emailHeader) {
      alert('Please Select an Identifier')
    } else {
      this.setState({ uploadCSV: true, previewData: false, uploadTemplate: true })
    }
  }

  // error check for identifier
  backToUpload () {
    this.setState({ uploadCSV: false, previewData: false, data: null, headers: null, emailHeader: null })
  }

  handleTemplate (text, headers) {
    this.setState({ uploadCSV: true, previewData: false, uploadTemplate: false, previewTemplate: true, template: text, tempHeaders: headers })
  }

  selectEmail (event, index, value) {
    this.setState({emailHeader: value})
  }

  render () {
    return (
      <div className='app-container'>
        <h1 style={{ textAlign: 'center' }}> Mass Mailer </h1>
        {this.state.uploadCSV === false ? <Form handleUpload={this.handleUpload.bind(this)} /> : null}
        {(Array.isArray(this.state.data) && this.state.previewData === true)
        ? <PreviewContact
          writeTemplate={this.writeTemplate.bind(this)}
          backToUpload={this.backToUpload.bind(this)}
          selectEmail={this.selectEmail.bind(this)}
          emailHeader={this.state.emailHeader}
          headers={this.state.headers}
          data={this.state.data}
          previewData={this.state.previewData}
        /> : null}
        {this.state.uploadTemplate === true
          ? <Template
            handleTemplate={this.handleTemplate.bind(this)}
            headers={this.state.headers}
          /> : null}
        {this.state.previewTemplate === true
        ? <PreviewTemplate
          template={this.state.template}
          headers={this.state.headers}
          tempHeaders={this.state.tempHeaders}
          data={this.state.data}
        /> : null}
        {this.state.loading === true ? <Loading /> : null}
      </div>
    )
  }
}
