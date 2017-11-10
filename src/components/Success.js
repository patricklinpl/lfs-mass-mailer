import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const Success = (props) => (
  <div>
    <br />
    <img className='center-img' alt='Success!' src='/success.svg' />
    <br /> <br />
    <div className='control-buttons'>
      <FlatButton label='Logout' href='https://secure.landfood.ubc.ca/Shibboleth.sso/Logout?return=https://lc.landfood.ubc.ca/' />
      <RaisedButton label='Send Another Email' primary onClick={props.reset} />
    </div>
  </div>
)

export default Success
