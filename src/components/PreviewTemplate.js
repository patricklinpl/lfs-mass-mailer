import React, { Component } from 'react'

export default class PreviewTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      template: props.template,
      data: props.data
    }
    this.getSampleData = this.getSampleData.bind(this)
  }

  getSampleData () {

  }

  render () {
    return (
      <div>
        {this.state.template}
      </div>
    )
  }
}
