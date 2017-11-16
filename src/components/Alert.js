import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const Alert = (props) => {
  const actions = (title) => {
    const buttons = [<FlatButton label='Dismiss' primary onClick={props.handleClose} />]
    return title === 'Confirmation' ? [...buttons, <FlatButton label='Send' primary onClick={props.closeAndSend} />] : buttons
  }
  return (
    <Dialog
      title={props.title}
      actions={actions(props.title)}
      modal={false}
      open={props.open}
      onRequestClose={props.handleClose}>
      {props.msg}
    </Dialog>
  )
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  closeAndSend: PropTypes.func.isRequired
}

export default Alert
