/* global XMLHttpRequest */
import React, { Component } from 'react'
import Papa from 'papaparse'
import { showPreview, showTemplate, findEmails, getValidEmails, getInvalidEmails } from '../scripts/util'
import Form from '../components/Form'
import Preview from '../components/Preview'
import Template from '../components/Template'
import Success from '../components/Success'
import Error from '../components/Error'
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
    this.determineError = this.determineError.bind(this)
  }

  /** ===== Form.js Functions ===== */

  getHeaders (data) {
    Array.isArray(data) && this.setState({ headers: Object.keys(data[0]) })
  }

  loadOn () {
    this.setState({ loading: true })
  }

  determineError (file) {
    if (file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
      return 'Unsupported file format, .CSV only'
    }
    if (file.size > 10000000) {
      return 'File should be under 10mb'
    }
    return 'Unknown Error'
  }

  handleUpload (state) {
    return event => {
      event.preventDefault()
      this.loadOn()
      if ((state.files.type === 'text/csv' || state.files.type === 'application/vnd.ms-excel') && state.files.size <= 10000000) {
        Papa.parse(state.files, {
          delimiter: ',',
          header: true,
          skipEmptyLines: true,
          complete: (results, file) => {
            if (results.data.length > 0) {
              this.getHeaders(results.data)
              const pruneData = results.data.filter(obj => {
                if (Object.keys(obj).length === this.state.headers.length) {
                  return Object.values(obj).reduce((acc, curr) => (acc + curr.length), 0) !== 0
                }
                return false
              })
              this.setState({ view: 'preview', data: pruneData, emailHeader: findEmails({ headers: this.state.headers, data: pruneData }), loading: false })
            } else {
              this.setState({ title: 'Error', msg: 'Empty CSV!', open: true, loading: false })
            }
          },
          error: (error, file) => {
            console.log(error)
            this.setState({ title: 'Error', msg: 'Something went wrong!', open: true, loading: false })
          }
        })
      } else {
        this.setState({ title: 'Error', msg: this.determineError(state.files), open: true, loading: false })
      }
    }
  }

  /** ===== Preview.js Functions ===== */

  selectEmail (event, index, value) {
    this.setState({ emailHeader: value })
  }

  writeTemplate () {
    if (this.state.emailHeader) {
      const emails = getValidEmails({ data: this.state.data, emailHeader: this.state.emailHeader })
      if (emails.length === this.state.data.length) {
        this.setState({ view: 'write', validEmail: emails })
      } else {
        const errorRow = getInvalidEmails({ data: this.state.data, emailHeader: this.state.emailHeader })
        const errorNumber = errorRow.length
        this.setState({ title: 'Error', open: true, msg: `Invalid Email Identifier. Number of row errors ${errorNumber}: ${JSON.stringify(errorRow[0])}` })
      }
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
          let successMsg = ''
          response.success[0].search('Preview') === -1 ? successMsg = response.success[0] : successMsg = response.success
          this.setState({ view: 'success', success: successMsg, loading: false })
        } else {
          this.setState({ view: 'error', error: response.error, loading: false })
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
        <h2 style={{ textAlign: 'center' }}> Please be Patient and Do Not Refresh the Browser!</h2>
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
        {this.state.view === 'error' ? <Error reset={this.reset.bind(this)} error={this.state.error} /> : null}
        {this.state.view === 'success' ? <Success reset={this.reset.bind(this)} success={this.state.success} /> : null}
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
