/* global describe, it, expect, cy */

describe('Mass-Mailer Test', () => {
  it('.should() - assert that <title> is correct', () => {
    cy.visit('http://localhost:8080')
    cy.title().should('include', 'The University of British Columbia')
  })

  it('send-email end point - base case', () => {
    const sampleData = { data:
    [ { 'First Name': 'Patrick',
      'Last Name': 'Lin',
      'Email': 'patricklin@alumni.ubc.ca' } ],
      emailID: 'Email',
      headers: [ 'First Name', 'Last Name', 'Email' ],
      subject: 'test',
      html: '<p>Hello %First Name%</p>' }
    cy.server()
    cy.request('POST', '/api/send-email', sampleData)
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('msg', 'success')
    })
  })

  it('send-email end point - empty object', () => {
    const emptyData = { }
    cy.server()
    cy.request({
      method: 'POST',
      url: '/api/send-email',
      body: emptyData,
      failOnStatusCode: false // turn off following redirects
    })
    .then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.have.property('msg', 'fail')
    })
  })

  it('send-email end point - empty data', () => {
    const noData = { data:
      [ ],
      emailID: 'Email',
      headers: [ 'First Name', 'Last Name', 'Email' ],
      subject: 'test',
      html: '<p>Hello %First Name%</p>' }
    cy.server()
    cy.request({
      method: 'POST',
      url: '/api/send-email',
      body: noData,
      failOnStatusCode: false // turn off following redirects
    })
    .then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.have.property('msg', 'fail')
    })
  })

  it('send-email end point - empty headers', () => {
    const noHeaders = { data:
    [ { 'First Name': 'Patrick',
      'Last Name': 'Lin',
      'Email': 'patricklin@alumni.ubc.ca' } ],
      emailID: 'Email',
      headers: [ ],
      subject: 'test',
      html: '<p>Hello %First Name%</p>' }
    cy.server()
    cy.request({
      method: 'POST',
      url: '/api/send-email',
      body: noHeaders,
      failOnStatusCode: false // turn off following redirects
    })
    .then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.have.property('msg', 'fail')
    })
  })

  it('send-email end point - empty id', () => {
    const emptyEmailId = { data:
    [ { 'First Name': 'Patrick',
      'Last Name': 'Lin',
      'Email': 'patricklin@alumni.ubc.ca' } ],
      emailID: '',
      headers: [ 'First Name', 'Last Name', 'Email' ],
      subject: 'test',
      html: '<p>Hello %First Name%</p>' }
    cy.server()
    cy.request({
      method: 'POST',
      url: '/api/send-email',
      body: emptyEmailId,
      failOnStatusCode: false // turn off following redirects
    })
    .then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.have.property('msg', 'fail')
    })
  })
})
