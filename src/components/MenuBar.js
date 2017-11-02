import React from 'react'
import AppBar from 'material-ui/AppBar'

const Menubar = (props) => (
  <AppBar
    title={props.title}
    showMenuIconButton={false}
  />
)

export default Menubar
