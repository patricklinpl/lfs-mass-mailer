import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

const Success = (props) => (
  <div>
    <br />
    <img className='center-img' alt='Success!' src='success.svg' />
    <br /> <br />
    <div>
      <Paper style={{margin: 20, padding: 20}} >
        <div dangerouslySetInnerHTML={createMarkup(props)} />
      </Paper>
    </div>
    <br /> <br />
    <div className='control-buttons'>
      <FlatButton label='Logout' href='https://secure.landfood.ubc.ca/Shibboleth.sso/Logout?return=https://lc.landfood.ubc.ca/' />
      <RaisedButton label='Send Another Email' primary onClick={props.reset} />
    </div>
  </div>
)

const createMarkup = (props) => ({__html: props.success})

export default Success

Success.propTypes = {
  success: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired
}
