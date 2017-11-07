/* global XMLHttpRequest, FormData */
import React, { Component } from 'react'
import Form from '../components/Form'
import PreviewContact from '../components/PreviewContact'
import Template from '../components/Template'
import Loading from '../components/Loading'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

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
      loading: false,
      open: false,
      errormsg: '',
      validateEmail: [],
      confirm: false,
      body: '',
      subject: ''
    }
    this.getHeaders = this.getHeaders.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.sendEmail = this.sendEmail.bind(this)
    this.closeAndSend = this.closeAndSend.bind(this)
    this.cancelSend = this.cancelSend.bind(this)
  }

  sendEmail () {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'api/send-email', true)
    xhr.setRequestHeader("Content-type", "application/json")    
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        const response = JSON.parse(xhr.response)
        if (xhr.status === 200) {
          console.log(response)
          this.setState({ loading: false })
        } else if (xhr.status === 404) {
          console.log(response)
          this.setState({ loading: false })
        }
      }
    }
    xhr.send(JSON.stringify({ data: this.state.data, emailID: this.state.emailHeader, subject: this.state.subject, html: this.state.body }))
  }

  /**
   * Form.js Functions
   * ============
  */

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
                this.setState({ open: true, errormsg: response.msg })
              } else {
                this.setState({ open: true, errormsg: 'Unsupported File Type!' })
              }
            } else {
              this.setState({ open: true, errormsg: 'File is too large!' })
            }
          }
        }
      }
      xhr.open('POST', 'api/form')
      xhr.send(FD)
    }
  }

  /** ============ */

  /**
   * PreviewContact.js Functions
   * ============
  */

  validateEmail (email) {
    const verify = /\S+@\S+\.\S+/
    return verify.test(email)
  }

  writeTemplate () {
    if (!this.state.emailHeader) {
      this.setState({ open: true, errormsg: 'Please Select an Identifier' })
    } else {
      const emails = []
      const invalidEmails = []
      this.state.data.forEach(row => {
        this.validateEmail(row[this.state.emailHeader]) ? emails.push(row[this.state.emailHeader]) : invalidEmails.push(row[this.state.emailHeader])
      })
      if (emails.length !== this.state.data.length) {
        invalidEmails.length === this.state.data.length ? this.setState({ open: true, errormsg: `Invalid Email Identifier: All rows are invalid` }) : this.setState({ open: true, errormsg: 'Invalid Email Identifier: Make sure all rows are filled with valid emails!' })
      } else {
        this.setState({ uploadCSV: true, previewData: false, uploadTemplate: true, validateEmail: emails })
      }
    }
  }

  backToUpload () {
    this.setState({ uploadCSV: false, previewData: false, data: null, headers: null, emailHeader: null })
  }

  selectEmail (event, index, value) {
    this.setState({emailHeader: value})
  }

  /** ============ */

  /**
   * Template.js Functions
   * ============
  */

  backToContactPrev () {
    this.setState({ uploadCSV: true, previewData: true, uploadTemplate: false, emailHeader: null, validateEmail: null })
  }

  handleTemplate (text, headers) {
    this.setState({ uploadCSV: true, previewData: false, uploadTemplate: false, previewTemplate: true, template: text, tempHeaders: headers })
  }

  /** ============ */

  /**
   * Error Dialog
   * ============
  */

  handleClose () {
    this.setState({open: false})
  }

  /** ============ */

  /**
   * Send Dialog
   * ============
  */

  closeAndSend () {
    this.setState({ loading: true, confirm: false }, this.sendEmail())
  }

  confirmSend (text, subject) {
    subject === '' ? this.setState({ open: true, errormsg: 'Subject is required!' }) : this.setState({ confirm: true, body: text, subject: subject })
  }

  cancelSend () {
    this.setState({ confirm: false })
  }

  /** ============ */

  render () {
    const actions = [
      <FlatButton
        label='Dismiss'
        primary
        onClick={this.handleClose}
      />
    ]
    const send = [
      <FlatButton
        label='Cancel'
        primary
        onClick={this.cancelSend}
        />,
      <FlatButton
        label='Send'
        primary
        onClick={this.closeAndSend}
        />]
    return (
      <div className='app-container'>
        <h1 style={{ textAlign: 'center' }}> Mass Mailer </h1>
        <Dialog
          title='Error'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          {this.state.errormsg}
        </Dialog>
        <Dialog
          title='Confirmation'
          actions={send}
          modal={false}
          open={this.state.confirm}
          onRequestClose={this.cancelSend}>
          Are you sure you want to send this email?
          </Dialog>
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
            data={this.state.data}
            handleTemplate={this.handleTemplate.bind(this)}
            backToContactPrev={this.backToContactPrev.bind(this)}
            confirmSend={this.confirmSend.bind(this)}
            headers={this.state.headers}
          /> : null}
        {this.state.loading === true ? <Loading /> : null}
      </div>
    )
  }
}
