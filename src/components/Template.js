import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import MenuBar from '../components/MenuBar'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }], [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link'], ['clean']],
  clipboard: {
    matchVisual: false
  }
}

const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link']

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: `<p>Hello %${props.headers[0]}%</p>`,
      subject: '',
      error: 'This field is required'
    }
    this.identiferButtons = this.identiferButtons.bind(this)
    this.dropText = this.dropText.bind(this)
    this.handleSubject = this.handleSubject.bind(this)
    this.handleText = this.handleText.bind(this)
    this.getSampleData = this.getSampleData.bind(this)
    this.replaceAll = this.replaceAll.bind(this)
  }

  identiferButtons () {
    return this.props.headers.map(head => (<FlatButton label={`%${head}%`} style={{ margin: 12 }} onClick={() => this.dropText(`%${head}%`)} />))
  }

  dropText (head) {
    this.setState({ text: this.state.text.concat(head) })
  }

  handleSubject (event) {
    event.target.value === '' ? this.setState({ subject: event.target.value, error: 'This field is required' }) : this.setState({ subject: event.target.value, error: '' })
  }

  handleText (value) {
    this.setState({ text: value })
  }

  getSampleData () {
    let preview = this.state.text
    this.props.headers.forEach(head => {
      preview = this.replaceAll({str: preview, find: `%${head}%`, replace: this.props.data[0][head]})
    })
    return preview
  }

  replaceAll ({ str, find, replace }) {
    return str.replace(new RegExp(find, 'ig'), replace)
  }

  render () {
    return (
      <div>
        <MenuBar title='Click on or Type the Following Identifiers:' />
        <br /><br />
        <Paper zDepth={2}>
          <div>
            {this.identiferButtons()}
          </div>
        </Paper>
        <br /><br />
        <MenuBar title='Write Your Template' />
        <br /><br />
        <TextField
          hintText='Subject'
          fullWidth
          errorText={this.state.error}
          value={this.state.subject}
          onChange={this.handleSubject}
            />
        <br /><br />
        <div>
          <ReactQuill
            value={this.state.text}
            onChange={this.handleText}
            modules={modules}
            formats={formats}
            style={{ height: 300 }}
              />
          <br /><br />
        </div>
        <br /><br />
        <MenuBar title='Live Preview' expandable />
        <br /><br />
        <Paper zDepth={2}>
          <div className='preview'>
            <div dangerouslySetInnerHTML={{ __html: this.getSampleData() }} />
          </div>
        </Paper>
        <br /> <br />
        <div className='control-buttons'>
          <FlatButton label='Back' onClick={this.props.backToContactPrev} />
          <RaisedButton label='Send' primary onClick={() => this.props.confirmSend({ subject: this.state.subject, body: this.state.text })} />
        </div>
        <br /> <br />
      </div>
    )
  }
}

Template.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  backToContactPrev: PropTypes.func.isRequired,
  confirmSend: PropTypes.func.isRequired
}
