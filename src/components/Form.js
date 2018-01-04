import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  button: {
    margin: 12
  },
  fileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }
}

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = { files: null }
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

  handleFileSelect (event) {
    this.setState({ files: event.target.files[0] })
  }

  render () {
    return (
      <div className='form'>
        <form onSubmit={this.props.handleUpload(this.state)}>
          <Card>
            <CardHeader
              title='Upload Contacts via .CSV'
              subtitle='Please upload a properly formatted .csv file. Files must be under 10mb. All other file types are rejected.'
              />
            <CardActions>
              <RaisedButton
                label='Choose a File'
                labelPosition='before'
                style={styles.button}
                containerElement='label'>
                <input type='file' name='file' ref='file' onChange={this.handleFileSelect} style={styles.fileInput} required />
              </RaisedButton>
              {!this.state.files ? null : <FlatButton label={this.state.files.name} />}
              <RaisedButton
                label='Upload'
                labelPosition='before'
                primary
                style={styles.button}
                containerElement='label'>
                <input type='submit' value='Upload' style={styles.fileInput} />
              </RaisedButton>
            </CardActions>
          </Card>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  handleUpload: PropTypes.func.isRequired
}
