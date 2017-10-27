import React, { Component } from 'react'

export default class PreviewTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      template: props.template,
      data: props.data,
      headers: props.headers,
      tempHeaders: props.tempHeaders
    }
    this.getSampleData = this.getSampleData.bind(this)
  }

  replaceAll (str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace)
  }

  getSampleData () {
    let preview = this.state.template
    this.state.headers.forEach(head => {
      if (this.state.tempHeaders.includes(`%${head}%`)) {
        preview = this.replaceAll(preview, `%${head}%`, this.state.data[0][head])
      }
    })
    return preview
  }

  render () {
    return (
      <div>
        <h1>Preview of First Row</h1>
        <div className='box'>
          <div dangerouslySetInnerHTML={{ __html: this.getSampleData() }} />
        </div>
      </div>
    )
  }
}
