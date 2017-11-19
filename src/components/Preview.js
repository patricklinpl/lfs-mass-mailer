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
  const head = () => ([...props.headers].map(row => (<Cell minWidthPx={100}>{row}</Cell>)))

  const row = (data) => ([...props.headers].map(row => (<Cell minWidthPx={100}>{data[row]}</Cell>)))

  const table = (data) => {
    const table = [<Row header >{head()}</Row>]
    return [...table, data.slice(0, 10).map(contact => (<Row>{row(contact)}</Row>))]
  }

  const dropdown = () => ([...props.headers].map(row => (<MenuItem value={row} primaryText={row} />)))

  return (
    <div>
      <MenuBar title='Preview of the First Ten Rows' />
      <br />
      <Paper zDepth={2}>
        <br />
        <div className='md-table'>
          <Table material className='md-table'>
            {table(props.data)}
          </Table>
        </div>
        <br />
      </Paper>
      <br />
      <div className='control-buttons' >
        <SelectField floatingLabelText='Select Email Identifier' value={props.emailHeader} onChange={props.selectEmail}>
          {dropdown()}
        </SelectField>
      </div>
      <br />
      <div className='control-buttons'>
        <FlatButton label='Back' onClick={props.backToUpload} />
        <RaisedButton label='Next' primary onClick={props.writeTemplate} />
      </div>
    </div>
  )
}

Preview.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  emailHeader: PropTypes.string,
  writeTemplate: PropTypes.func.isRequired,
  backToUpload: PropTypes.func.isRequired,
  selectEmail: PropTypes.func.isRequired
}

export default Preview
