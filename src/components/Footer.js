import React from 'react'
import Paper from 'material-ui/Paper'

const Footer = () => (
  <div className='footer'>
    <Paper style={{margin: 20, padding: 20}} >
      <p>For assistance contact: <a href='mailto:it@landfood.ubc.ca' target='_top'>it@landfood.ubc.ca</a></p>
      <a href='https://secure.landfood.ubc.ca/Shibboleth.sso/Logout?return=http://dietetics.landfood.ubc.ca' >CWL LOGOUT</a>
    </Paper>
  </div>
)

export default Footer
