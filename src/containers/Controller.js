/* global XMLHttpRequest, FormData */
import React, { Component } from 'react'
import { showPreview, showTemplate, findEmails, getValidEmails } from '../scripts/util'
import Form from '../components/Form'
import Preview from '../components/Preview'
import Template from '../components/Template'
import Success from '../components/Success'
import Loading from '../components/Loading'
import Footer from '../components/Footer'
import Alert from '../components/Alert'

export default class Controller extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: 'upload',
      data: null,
      headers: null,
      emailHeader: null,
      validEmail: [],
      subject: '',
      body: '',
      loading: false,
      title: '',
      msg: '',
      open: false
    }
    this.getHeaders = this.getHeaders.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.sendEmail = this.sendEmail.bind(this)
    this.closeAndSend = this.closeAndSend.bind(this)
    this.loadOn = this.loadOn.bind(this)
  }

  /** ===== Form.js Functions ===== */

  getHeaders (data) {
    Array.isArray(data) && this.setState({ headers: Object.keys(data[0]) })
  }

  loadOn () {
    this.setState({ loading: true })
  }

  handleUpload (state) {
    return event => {
      event.preventDefault()
      this.loadOn()
      const xhr = new XMLHttpRequest()
      let FD = new FormData()
      for (let name in state) {
        FD.append(name, state[name])
      }
      xhr.onload = () => {
        if (xhr.readyState === 4) {
          const response = JSON.parse(xhr.response)
          if (xhr.status === 200) {
            this.getHeaders(response.csv)
            this.setState({ view: 'preview', data: response.csv, emailHeader: findEmails({ headers: this.state.headers, data: response.csv }), loading: false })
          } else if (xhr.status === 404) {
            this.setState({ title: 'Error', msg: response.msg, open: true, loading: false })
          }
        }
      }
      xhr.open('POST', 'api/form')
      xhr.send(FD)
    }
  }

  /** ===== Preview.js Functions ===== */

  selectEmail (event, index, value) {
    this.setState({ emailHeader: value })
  }

  writeTemplate () {
    if (this.state.emailHeader) {
      const emails = getValidEmails({ data: this.state.data, emailHeader: this.state.emailHeader })
      emails.length === this.state.data.length ? this.setState({ view: 'write', validEmail: emails }) : this.setState({ title: 'Error', open: true, msg: 'Invalid Email Identifier: Make sure all rows are filled with valid emails!' })
    } else {
      this.setState({ title: 'Error', open: true, msg: 'Please Select an Identifier' })
    }
  }

  backToUpload () {
    this.setState({ view: 'upload', data: null, headers: null, emailHeader: null })
  }

  /** ===== Template.js Functions ===== */

  backToContactPrev () {
    this.setState({ view: 'preview', validEmail: null })
  }

  confirmSend ({subject, body}) {
    subject === '' ? this.setState({ title: 'Error', msg: 'Subject is required!', open: true }) : this.setState({ title: 'Confirmation', msg: 'Are you sure you want to send this email?', open: true, body: body, subject: subject })
  }

  sendEmail () {
    this.loadOn()
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'api/send-email', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        const response = JSON.parse(xhr.response)
        if (xhr.status === 200 && response.msg === 'success') {
          this.setState({ view: 'success', loading: false })
        }
      }
    }
    xhr.send(JSON.stringify({ data: this.state.data, emailID: this.state.emailHeader, headers: this.state.headers, subject: this.state.subject, html: this.state.body }))
  }

  /** ===== Dialog.js Functions ===== */

  handleClose () {
    this.setState({ title: '', msg: '', open: false })
  }

  closeAndSend () {
    this.setState({ loading: true, title: '', msg: '', open: false }, this.sendEmail())
  }

  /** ===== Success.js Functions ===== */

  reset () {
    this.setState({ view: 'upload', body: '', data: null, emailHeader: null, headers: null, subject: '', validEmail: null })
  }

  render () {
    return (
      <div className='app-container'>
        <h1 style={{ textAlign: 'center' }}> Mass Mailer </h1>
        <br />
        {this.state.view === 'upload' ? <Form handleUpload={this.handleUpload.bind(this)} /> : null}
        {showPreview({ data: this.state.data, view: this.state.view, headers: this.state.headers })
        ? <Preview
          headers={this.state.headers}
          data={this.state.data}
          emailHeader={this.state.emailHeader}
          writeTemplate={this.writeTemplate.bind(this)}
          backToUpload={this.backToUpload.bind(this)}
          selectEmail={this.selectEmail.bind(this)}
        /> : null}
        {showTemplate({ data: this.state.data, view: this.state.view, headers: this.state.headers, emailHeader: this.state.emailHeader })
          ? <Template
            data={this.state.data}
            headers={this.state.headers}
            backToContactPrev={this.backToContactPrev.bind(this)}
            confirmSend={this.confirmSend.bind(this)}
          /> : null}
        {this.state.loading === true ? <Loading /> : null}
        {this.state.view === 'success' ? <Success reset={this.reset.bind(this)} /> : null}
        <Footer />
        <Alert
          title={this.state.title}
          msg={this.state.msg}
          open={this.state.open}
          handleClose={this.handleClose}
          closeAndSend={this.closeAndSend}
        />
      </div>
    )
  }
}
