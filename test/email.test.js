/* global describe, it, expect */
import assert from 'assert'
import { parseData, replaceAll, makeBody, makeOptions, sendEmail } from '../server/email.js'

describe('replaceAll', () => {
  it('normal string', () => {
    const string1 = 'The instructor made it'
    const string2 = 'The duck made it'
    assert.deepEqual(replaceAll({str: string1, find: 'instructor', replace: 'duck'}), string2)
  })
  it('capital string', () => {
    const string1 = 'The INSTRUCTOR made it'
    const string2 = 'The duck made it'
    assert.deepEqual(replaceAll({str: string1, find: 'instructor', replace: 'duck'}), string2)
  })
  it('capital and lower case string', () => {
    const string1 = 'The INStrUCTOR made it'
    const string2 = 'The duck made it'
    assert.deepEqual(replaceAll({str: string1, find: 'instructor', replace: 'duck'}), string2)
  })
})

describe('makeBody', () => {
  it('normal variables', () => {
    const contact = { firstname: 'Patrick', lastname: 'Lin', email: 'patricklin@alumni.ubc.ca' }
    const body = '<p>Hello %firstname%</p>'
    const headers = [ 'firstname', 'lastname', 'email' ]
    const output = '<p>Hello Patrick</p>'
    assert.deepEqual(makeBody({contact, body, headers}), output)
  })
  it('capital variables', () => {
    const contact = { firstname: 'Patrick', lastname: 'Lin', email: 'patricklin@alumni.ubc.ca' }
    const body = '<p>Hello %FIRSTNAME%</p>'
    const headers = [ 'firstname', 'lastname', 'email' ]
    const output = '<p>Hello Patrick</p>'
    assert.deepEqual(makeBody({contact, body, headers}), output)
  })
  it('capital and lowercase variables', () => {
    const contact = { firstname: 'Patrick', lastname: 'Lin', email: 'patricklin@alumni.ubc.ca' }
    const body = '<p>Hello %FIrstNAME%</p>'
    const headers = [ 'firstname', 'lastname', 'email' ]
    const output = '<p>Hello Patrick</p>'
    assert.deepEqual(makeBody({contact, body, headers}), output)
  })
  it('invalid variable case', () => {
    const contact = { firstname: 'Patrick', lastname: 'Lin', email: 'patricklin@alumni.ubc.ca' }
    const body = '<p>Hello %FIrst NAME%</p>'
    const headers = [ 'firstname', 'lastname', 'email' ]
    const output = '<p>Hello %FIrst NAME%</p>'
    assert.deepEqual(makeBody({contact, body, headers}), output)
  })
})

describe('makeOptions', () => {
  it('expected variables', () => {
    const state = { data:
    [ { 'First Name': 'Patrick',
      'Last Name': 'Lin',
      'Email': 'patricklin@alumni.ubc.ca' } ],
      emailID: 'Email',
      headers: [ 'First Name', 'Last Name', 'Email' ],
      subject: 'test',
      html: '<p>Hello %First Name%</p>' }

    // local test, from: 'FirstName LastName <email>'
    const output = [ { from: 'undefined <undefined>',
      to: 'patricklin@alumni.ubc.ca',
      subject: 'test',
      html: '<p>Hello Patrick</p>' } ]

    assert.deepEqual(makeOptions(state), output)
  })
  it('empty values', () => {
    const state = { data:
    [ { } ],
      emailID: '',
      headers: [ '' ],
      subject: 'test',
      html: '' }

    // local test, from: 'FirstName LastName <email>'
    const output = [ { from: 'undefined <undefined>',
      to: undefined,
      subject: 'test',
      html: '' } ]

    assert.deepEqual(makeOptions(state), output)
  })
})

describe('parseData', () => {
  it('base case', () => {
    const state = { data:
    [ { 'First Name': 'Patrick',
      'Last Name': 'Lin',
      'Email': 'patricklin@alumni.ubc.ca' } ],
      emailID: 'Email',
      headers: [ 'First Name', 'Last Name', 'Email' ],
      subject: 'testsuite - succesful send',
      html: '<p>Hello %First Name%</p>' }
      // local test, parseData(state).then(data => expect(data).toEqual('Success'))
    return parseData(state).catch(data => expect(data.message).toEqual('connect ECONNREFUSED 127.0.0.1:587'))
  })
  it('empty data', () => {
    const state = { data:
      [ { } ],
      emailID: '',
      headers: [ '' ],
      subject: 'test',
      html: '' }
      // local test, parseData(state).catch(data => expect(data.message).toEqual('No recipients defined'))
    return parseData(state).catch(data => expect(data.message).toEqual('invalid data'))
  })
  it('empty subject', () => {
    const state = { data:
    [ { 'First Name': 'Patrick',
      'Last Name': 'Lin',
      'Email': 'patricklin@alumni.ubc.ca' } ],
      emailID: 'Email',
      headers: [ 'First Name', 'Last Name', 'Email' ],
      subject: '',
      html: '' }
      // local test, parseData(state).then(data => expect(data).toEqual('Success')) // check spam
    return parseData(state).catch(data => expect(data.message).toEqual('connect ECONNREFUSED 127.0.0.1:587'))
  })
})

describe('sendEmail', () => {
  it('base case', () => {
    const mailOptions = { from: 'Patrick Lin <patrick.lin@sauder.ubc.ca>',
      to: 'patricklin@alumni.ubc.ca',
      subject: 'testsuite',
      html: '<p>Hello Patrick</p>' }
      // local test, sendEmail(mailOptions).then(data => expect(data).toEqual('Message sent'))
    return sendEmail(mailOptions).catch(data => expect(data.message).toEqual('connect ECONNREFUSED 127.0.0.1:587'))
  })
  it('no email', () => {
    const mailOptions = { from: 'Patrick Lin <patrick.lin@sauder.ubc.ca>',
      to: '',
      subject: 'testsuite',
      html: '<p>Hello Patrick</p>' }
      // local test, sendEmail(mailOptions).catch(data => expect(data.message).toEqual('No recipients defined'))
    return sendEmail(mailOptions).catch(data => expect(data.message).toEqual('No recipients defined'))
  })
  it('no subject', () => {
    const mailOptions = { from: 'Patrick Lin <patrick.lin@sauder.ubc.ca>',
      to: 'patricklin@alumni.ubc.ca',
      subject: '',
      html: '<p>Hello Patrick</p>' }
      // local test, sendEmail(mailOptions).then(data => expect(data).toEqual('Message sent')) // check spam
    return sendEmail(mailOptions).catch(data => expect(data.message).toEqual('connect ECONNREFUSED 127.0.0.1:587'))
  })
})
