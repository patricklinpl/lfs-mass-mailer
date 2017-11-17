import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import { Table, Row, Cell } from 'react-responsive-table'
import MenuBar from '../components/MenuBar'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }], [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']],
  clipboard: {
    matchVisual: false
  }
}

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

const styles = {
  textArea: {
    height: 300
  }
}

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: `<p>Hello %${props.headers[0]}%</p>`,
      headers: props.headers,
      idHeaders: null,
      data: props.data,
      subject: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubject = this.handleSubject.bind(this)
    this.buildIdentifer = this.buildIdentifer.bind(this)
    this.handleTemplate = this.handleTemplate.bind(this)
    this.buildHeaders = this.buildHeaders.bind(this)
    this.replaceAll = this.replaceAll.bind(this)
    this.getSampleData = this.getSampleData.bind(this)
  }

  handleChange (value) {
    this.setState({ text: value })
  }

  handleSubject (event) {
    this.setState({ subject: event.target.value })
  }

  buildHeaders () {
    const tableHeads = []
    const idHeads = []
    this.state.headers.forEach(head => {
      const id = `%${head}%`
      idHeads.push(id)
      tableHeads.push(<Cell minWidthPx={50} key={`cell`}>{id}</Cell>)
    })
    return {
      table: tableHeads,
      id: idHeads
    }
  }

  buildIdentifer () {
    const tableHeads = this.buildHeaders().table
    return tableHeads
  }

  handleTemplate () {
    this.setState({ idHeaders: this.buildHeaders().id }, () => this.props.handleTemplate(this.state.text, this.state.idHeaders))
  }

  replaceAll (str, find, replace) {
    return str.replace(new RegExp(find, 'ig'), replace)
  }

  getSampleData () {
    let preview = this.state.text
    this.state.headers.forEach(head => {
      const identifer = `%${head}%`
      if (this.buildHeaders().id.includes(identifer)) {
        preview = this.replaceAll(preview, identifer, this.state.data[0][head])
      }
    })
    return preview
  }

  render () {
    return (
      <div>
        <MenuBar title='The following are identifers you can use:' />
        <br /><br />
        <Paper zDepth={2}>
          <div className='md-table'>
            <Table material className='md-table'>
              <Row header key='row'>
                {this.buildIdentifer()}
              </Row>
            </Table>
          </div>
        </Paper>
        <br /><br />
        <MenuBar title='Write Your Template' />
        <br /><br />
        <div>
          <TextField
            floatingLabelText='Subject'
            fullWidth
            value={this.state.subject}
            onChange={this.handleSubject} />
        </div>
        <br /><br />
        <Paper zDepth={2}>
          <div>
            <ReactQuill
              value={this.state.text}
              onChange={this.handleChange}
              modules={modules}
              formats={formats}
              style={styles.textArea}
              />
          </div>
        </Paper>
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
