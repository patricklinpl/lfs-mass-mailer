/* global XMLHttpRequest, FormData */
import React, { Component } from 'react'
import Form from '../components/Form'
import PreviewContact from '../components/PreviewContact'
import Template from '../components/Template'
import PreviewTemplate from '../components/PreviewTemplate'

export default class Controller extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadCSV: false,
      previewData: false,
      uploadTemplate: false,
      previewTemplate: false,
      headers: null,
      tempHeaders: null,
      data: null,
      template: null
    }
    this.getHeaders = this.getHeaders.bind(this)
  }

  getHeaders (data) {
    if (Array.isArray(data)) {
      this.setState({ headers: Object.keys(data[0]) })
    }
  }

  handleUpload (state) {
    return event => {
      event.preventDefault()
      let FD = new FormData()
      for (let name in state) {
        FD.append(name, state[name])
      }
      const xhr = new XMLHttpRequest()
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const json = JSON.parse(xhr.response)
          if (json.csv) {
            this.getHeaders(json.csv)
            this.setState({
              uploadCSV: true,
              data: json.csv,
              previewData: true
            })
          }
        }
        if (xhr.readyState === 4 && xhr.status === 404) {
          const json = JSON.parse(xhr.response)
          console.log(json)
        }
      }
      xhr.open('POST', 'api/form')
      xhr.send(FD)
    }
  }

  writeTemplate () {
    this.setState({
      uploadCSV: true,
      previewData: false,
      uploadTemplate: true
    })
  }

  handleTemplate (text, headers) {
    this.setState({
      uploadCSV: true,
      previewData: false,
      uploadTemplate: false,
      previewTemplate: true,
      template: text,
      tempHeaders: headers
    })
  }

  render () {
    return (
      <div className='app-container'>
        <h1 style={{ textAlign: 'center' }}> Mass Mailer </h1>
        {this.state.uploadCSV === false ? <Form handleUpload={this.handleUpload.bind(this)} /> : null}
        {(Array.isArray(this.state.data) && this.state.previewData === true)
        ? <PreviewContact
          writeTemplate={this.writeTemplate.bind(this)}
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
      </div>
    )
  }
}
