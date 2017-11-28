/* global describe, it */
import assert from 'assert'
import { parseData, replaceAll, makeBody, makeOptions, sendEmail } from '../server/email.js'

describe('replaceAll', () => {
  it('takes a string, and a string to replace', () => {
    const string1 = 'The instructor made it'
    const string2 = 'The duck made it'
    assert.deepEqual(replaceAll({str: string1, find: 'instructor', replace: 'duck'}), string2)
  })
})
