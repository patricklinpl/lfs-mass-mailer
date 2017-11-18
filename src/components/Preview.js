import React from 'react'
import PropTypes from 'prop-types'
import MenuBar from '../components/MenuBar'
import { Table, Row, Cell } from 'react-responsive-table'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'

const Preview = (props) => {
  const dropDownBuilder = () => {
    const headers = props.headers
    return headers.map(element => (
      <MenuItem value={element} primaryText={element} />
    ))
  }

  const cellBuilder = (data, type) => {
    const headers = props.headers
    return headers.map(element => (
      <Cell minWidthPx={100}>{type === 'head' ? element : data[element]}</Cell>
    ))
  }

  const tableBuilder = (data) => {
    const tableArray = []
    if (data.length > 0) {
      const headerRow = <Row header key='row1'>{cellBuilder(data, 'head')}</Row>
      tableArray.push(headerRow)
      for (let i = 0; i < (data.length > 10 ? 10 : data.length); i++) {
        tableArray.push(<Row>{cellBuilder(data[i], 'row')}</Row>)
      }
    }
    return tableArray
  }
  return (
    <div>
      <MenuBar title='Preview of the First Ten Rows' />
      <br />
      <Paper zDepth={2}>
        <br /> <br />
        <div className='md-table'>
          <Table material className='md-table'>
            {tableBuilder(props.data)}
          </Table>
        </div>
        <br /> <br />
      </Paper>
      <br /> <br />
      <div className='control-buttons' >
        <SelectField floatingLabelText='Select Email Identifier' value={props.emailHeader} onChange={props.selectEmail}>
          <MenuItem value={null} primaryText='' />
          {dropDownBuilder()}
        </SelectField>
      </div>
      <br /> <br />
      <div className='control-buttons'>
        <FlatButton label='Back' onClick={props.backToUpload} />
        <RaisedButton label='Next' primary onClick={props.writeTemplate} />
      </div>
      <br /> <br />
    </div>
  )
}

Preview.propTypes = {
  writeTemplate: PropTypes.func.isRequired,
  backToUpload: PropTypes.func.isRequired,
  selectEmail: PropTypes.func.isRequired,
  emailHeader: PropTypes.string,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}

export default Preview
