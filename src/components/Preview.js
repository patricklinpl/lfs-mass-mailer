import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuBar from '../components/MenuBar'
import { Table, Row, Cell } from 'react-responsive-table'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'

export default class Preview extends Component {
  constructor (props) {
    super(props)
    this.tableBuilder = this.tableBuilder.bind(this)
    this.cellBuilder = this.cellBuilder.bind(this)
    this.dropDownBuilder = this.dropDownBuilder.bind(this)
  }

  dropDownBuilder () {
    const headers = this.props.headers
    return headers.map(element => (
      <MenuItem value={element} primaryText={element} />
    ))
  }

  cellBuilder (data, type) {
    const headers = this.props.headers
    return headers.map(element => (
      <Cell minWidthPx={100}>{type === 'head' ? element : data[element]}</Cell>
    ))
  }

  tableBuilder (data) {
    const tableArray = []
    if (data.length > 0) {
      const headerRow = <Row header key='row1'>{this.cellBuilder(data, 'head')}</Row>
      tableArray.push(headerRow)
      for (let i = 0; i < (data.length > 10 ? 10 : data.length); i++) {
        tableArray.push(<Row>{this.cellBuilder(data[i], 'row')}</Row>)
      }
    }
    return tableArray
  }

  render () {
    return (
      <div>
        <MenuBar title='Preview of the First Ten Rows' />
        <br />
        <Paper zDepth={2}>
          <br /> <br />
          <div className='md-table'>
            <Table material className='md-table'>
              {this.tableBuilder(this.props.data)}
            </Table>
          </div>
          <br /> <br />
        </Paper>
        <br /> <br />
        <div className='control-buttons' >
          <SelectField floatingLabelText='Select Email Identifier' value={this.props.emailHeader} onChange={this.props.selectEmail}>
            <MenuItem value={null} primaryText='' />
            {this.dropDownBuilder()}
          </SelectField>
        </div>
        <br /> <br />
        <div className='control-buttons'>
          <FlatButton label='Back' onClick={this.props.backToUpload} />
          <RaisedButton label='Next' primary onClick={this.props.writeTemplate} />
        </div>
        <br /> <br />
      </div>
    )
  }
}

Preview.propTypes = {
  writeTemplate: PropTypes.func.isRequired,
  backToUpload: PropTypes.func.isRequired,
  selectEmail: PropTypes.func.isRequired,
  emailHeader: PropTypes.string,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}
