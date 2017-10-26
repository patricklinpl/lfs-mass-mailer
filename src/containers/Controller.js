/* global XMLHttpRequest, FormData */
import React, { Component } from 'react'
import Form from '../components/Form'
import PreviewContact from '../components/PreviewContact'

export default class Controller extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadCSV: false,
      data: null
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
            this.setState({
              uploadCSV: true,
              data: json.csv
            })
          }
        }
      }
      xhr.open('POST', 'api/form')
      xhr.send(FD)
    }
  }

  render () {
    return (
      <div className='app-container'>
        <h1 style={{ textAlign: 'center' }}> Mass Mailer </h1>
        {this.state.uploadCSV === false ? <Form handleUpload={this.handleUpload.bind(this)} /> : null}
        {Array.isArray(this.state.data) ? <PreviewContact data={this.state.data} /> : null}
      </div>
    )
  }
}
