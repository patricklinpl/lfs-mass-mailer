import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Controller from './containers/Controller'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <MuiThemeProvider>
          <Controller />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
