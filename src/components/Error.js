import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

const Error = (props) => (
  <div>
    <br />
    <img className='center-img' alt='Error!' src='error.svg' />
    <br /> <br />
    <div>
      <Paper style={{margin: 20, padding: 20}} >
        {props.error}
      </Paper>
    </div>
    <br /> <br />
    <div className='control-buttons'>
      <FlatButton label='Logout' href='https://secure.landfood.ubc.ca/Shibboleth.sso/Logout?return=https://lc.landfood.ubc.ca/' />
      <RaisedButton label='Send Another Email' primary onClick={props.reset} />
    </div>
  </div>
)

export default Error

Error.propTypes = {
  reset: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
}
