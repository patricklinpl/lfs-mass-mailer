/* global XMLHttpRequest, FormData */
import React, { Component } from 'react'
import { findEmails, validateEmail } from '../scripts/util'
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
      view: 'upload', // upload, preview, write, success
      headers: null, // headers
      data: null,    // csv data

      title: '', // dialog Error, Confirmation
      msg: '',   // dialog msg
      open: false, // dialog open

      loading: false, // loading bar

      emailHeader: null,
      tempHeaders: null,
      template: null,
      validEmail: [],

      subject: '',
      body: ''
    }
    this.getHeaders = this.getHeaders.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.sendEmail = this.sendEmail.bind(this)
    this.closeAndSend = this.closeAndSend.bind(this)
    this.loadOn = this.loadOn.bind(this)
    this.shouldShowPreview = this.shouldShowPreview.bind(this)
  }

  reset () {
    this.setState({ view: 'upload', body: '', data: null, emailHeader: null, headers: null, subject: '', validEmail: null })
  }

  sendEmail () {
    this.loadOn()
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'api/send-email', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        const response = JSON.parse(xhr.response)
        if (xhr.status === 200) {
          console.log(response)
          this.setState({ view: 'success', loading: false })
        } else if (xhr.status === 404) {
          console.log(response)
          this.setState({ loading: false })
        }
      }
    }
    xhr.send(JSON.stringify({ data: this.state.data, emailID: this.state.emailHeader, headers: this.state.headers, subject: this.state.subject, html: this.state.body }))
  }

  /**
   * Form.js Functions
   * ============
  */
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
  /** ============ */

  /**
   * Preview.js Functions
   * ============
  */

  selectEmail (event, index, value) {
    this.setState({ emailHeader: value })
  }

  writeTemplate () {
    if (!this.state.emailHeader) {
      this.setState({ title: 'Error', open: true, msg: 'Please Select an Identifier' })
    } else {
      const emails = []
      const invalidEmails = []
      this.state.data.forEach(row => {
        validateEmail(row[this.state.emailHeader]) ? emails.push(row[this.state.emailHeader]) : invalidEmails.push(row[this.state.emailHeader])
      })
      if (emails.length !== this.state.data.length) {
        invalidEmails.length === this.state.data.length ? this.setState({ title: 'Error', open: true, msg: `Invalid Email Identifier: All rows are invalid` }) : this.setState({ title: 'Error', open: true, msg: 'Invalid Email Identifier: Make sure all rows are filled with valid emails!' })
      } else {
        this.setState({ view: 'write', validEmail: emails })
      }
    }
  }

  backToUpload () {
    this.setState({ view: 'upload', data: null, headers: null, emailHeader: null })
  }

  /** ============ */

  /**
   * Template.js Functions
   * ============
  */

  backToContactPrev () {
    this.setState({ view: 'preview', emailHeader: null, validEmail: null })
  }

  handleTemplate (text, headers) {
    this.setState({ view: 'write', template: text, tempHeaders: headers })
  }

  /** ============ */

  /**
   * Dialog
   * ============
  */

  handleClose () {
    this.setState({ title: '', msg: '', open: false })
  }

  closeAndSend () {
    this.setState({ loading: true, title: '', msg: '', open: false }, this.sendEmail())
  }

  confirmSend ({subject, body}) {
    subject === '' ? this.setState({ title: 'Error', msg: 'Subject is required!', open: true }) : this.setState({ title: 'Confirmation', msg: 'Are you sure you want to send this email?', open: true, body: body, subject: subject })
  }

  /** ============ */

  shouldShowPreview ({ data, view, headers }) {
    return Array.isArray(data) && Array.isArray(headers) && headers.length >= 1 && data.length >= 1 && view === 'preview'
  }

  render () {
    return (
      <div className='app-container'>
        <h1 style={{ textAlign: 'center' }}> Mass Mailer </h1>
        <br />
        {this.state.view === 'upload' ? <Form handleUpload={this.handleUpload.bind(this)} /> : null}
        {this.shouldShowPreview({ data: this.state.data, view: this.state.view, headers: this.state.headers })
        ? <Preview
          headers={this.state.headers}
          data={this.state.data}
          emailHeader={this.state.emailHeader}
          writeTemplate={this.writeTemplate.bind(this)}
          backToUpload={this.backToUpload.bind(this)}
          selectEmail={this.selectEmail.bind(this)}
        /> : null}
        {this.state.view === 'write'
          ? <Template
            data={this.state.data}
            handleTemplate={this.handleTemplate.bind(this)}
            backToContactPrev={this.backToContactPrev.bind(this)}
            confirmSend={this.confirmSend.bind(this)}
            headers={this.state.headers}
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
