/* global XMLHttpRequest, FormData */
import React, { Component } from 'react'
import Form from '../components/Form'

export default class Controller extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  handleSubmit (state) {
    return event => {
      event.preventDefault()
      let FD = new FormData()
      for (let name in state) {
        FD.append(name, state[name])
        console.log(name)
        console.log(state[name])
      }
      const xhr = new XMLHttpRequest()
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const json = JSON.parse(xhr.response)
          console.log(json)
        }
      }
      xhr.open('POST', 'api/form')
      xhr.send(FD)
    }
  }

  render () {
    return (
      <div className='app-container'>
        <h1 style={{ textAlign: 'center' }}> Mass Mailer </h1>
        <Form handleSubmit={this.handleSubmit.bind(this)} />
      </div>
    )
  }
}
