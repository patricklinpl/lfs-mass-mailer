/* global describe, it */
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
    const contact = { firstname: 'Patrick', lastname: 'Lin', email: 'patricklin@alumnu.ubc.ca' }
    const body = '<p>Hello %firstname%</p>'
    const headers = [ 'firstname', 'lastname', 'email' ]
    const output = '<p>Hello Patrick</p>'
    assert.deepEqual(makeBody({contact, body, headers}), output)
  })
  it('capital variables', () => {
    const contact = { firstname: 'Patrick', lastname: 'Lin', email: 'patricklin@alumnu.ubc.ca' }
    const body = '<p>Hello %FIRSTNAME%</p>'
    const headers = [ 'firstname', 'lastname', 'email' ]
    const output = '<p>Hello Patrick</p>'
    assert.deepEqual(makeBody({contact, body, headers}), output)
  })
  it('capital and lowercase variables', () => {
    const contact = { firstname: 'Patrick', lastname: 'Lin', email: 'patricklin@alumnu.ubc.ca' }
    const body = '<p>Hello %FIrstNAME%</p>'
    const headers = [ 'firstname', 'lastname', 'email' ]
    const output = '<p>Hello Patrick</p>'
    assert.deepEqual(makeBody({contact, body, headers}), output)
  })
  it('false variable case', () => {
    const contact = { firstname: 'Patrick', lastname: 'Lin', email: 'patricklin@alumnu.ubc.ca' }
    const body = '<p>Hello %FIrst NAME%</p>'
    const headers = [ 'firstname', 'lastname', 'email' ]
    const output = '<p>Hello %FIrst NAME%</p>'
    assert.deepEqual(makeBody({contact, body, headers}), output)
  })
})
