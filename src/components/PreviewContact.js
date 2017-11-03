import React, { Component } from 'react'
import { Table, Row, Cell } from 'react-responsive-table'
import MenuBar from '../components/MenuBar'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class PreviewContact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      csv: props.data,
      previewData: props.previewData
    }
    this.tableBuilder = this.tableBuilder.bind(this)
    this.cellBuilder = this.cellBuilder.bind(this)
    this.dropDownBuilder = this.dropDownBuilder.bind(this)
  }

  dropDownBuilder () {
    const options = []
    const headers = this.props.headers
    for (let i = 0; i < headers.length; i++) {
      options.push(<MenuItem value={headers[i]} primaryText={headers[i]} />)
    }
    return options
  }

  cellBuilder (data, type) {
    const store = []
    const headers = this.props.headers
    for (let i = 0; i < headers.length; i++) {
      store.push(<Cell minWidthPx={100} key={`cell${i + 1}`}>{type === 'head' ? headers[i] : data[headers[i]]}</Cell>)
    }
    return store
  }

  tableBuilder (data) {
    const tableArray = []
    if (data.length > 0) {
      const headerRow = <Row header key='row1'>{this.cellBuilder(data, 'head')}</Row>
      tableArray.push(headerRow)
      for (let i = 0; i < (data.length > 10 ? 10 : data.length); i++) {
        tableArray.push(<Row striped key={`row${i + 2}`}>{this.cellBuilder(data[i], 'row')}</Row>)
      }
    }
    return tableArray
  }

  render () {
    return (
      <div>
        <MenuBar title='Preview of the First Ten Rows' />
        <div className='md-table'>
          <Table material className='md-table'>
            {this.tableBuilder(this.state.csv)}
          </Table>
        </div>
        <br />
        <br />
        <div className='control-buttons' >
          <SelectField floatingLabelText='Select Email Identifier' value={this.props.emailHeader} onChange={this.props.selectEmail}>
            <MenuItem value={null} primaryText='' />
            {this.dropDownBuilder()}
          </SelectField>
        </div>
        <br />
        <br />
        <div className='control-buttons'>
          <RaisedButton label='Back' onClick={this.props.backToUpload} />
          <RaisedButton label='Next' primary onClick={this.props.writeTemplate} />
        </div>
      </div>
    )
  }
}
