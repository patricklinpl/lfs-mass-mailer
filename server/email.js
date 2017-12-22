import nodemailer from 'nodemailer'
import { setTimeout } from 'timers'
import Promise from 'bluebird'
require('dotenv').config()

const replaceAll = ({ str, find, replace }) => {
  return str.replace(new RegExp(find, 'ig'), replace)
}

const makeBody = ({ contact, body, headers }) => {
  let personalBody = body
  headers.forEach(head => {
    const identifer = `%${head}%`
    personalBody = replaceAll({ str: personalBody, find: identifer, replace: contact[head] })
  })
  return personalBody
}

const makeOptions = (state) => (
  state.data.map(contact => {
    const body = makeBody({ contact: contact, body: state.html, headers: state.headers })
    return {
      from: `${process.env.ACCOUNT_NAME} <${process.env.ACCOUNT_EMAIL}>`,
      to: contact[state.emailID],
      subject: state.subject,
      html: body
    }
  })
)

const parseData = (state) => {
  return new Promise((resolve, reject) => {
    const csv = makeOptions(state)
    const sendArray = []
    for (let i = 0; i < csv.length; i++) {
      sendArray.push(timeOut(csv[i], i))
    }
    Promise.all(sendArray)
    .then(() => resolve())
    .catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

const timeOut = (profile, i) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      sendEmail(profile)
      .then(() => resolve())
      .catch((error) => reject(error))
    }, i * 100)
  })
}

const sendEmail = (mailOptions, cb) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      auth: {
        user: process.env.ACCOUNT_USER,
        pass: process.env.ACCOUNT_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error)
        return
      }
      console.log('Message sent: %s', info.messageId)
      resolve()
    })
  })
}

export {
  parseData,
  replaceAll,
  makeBody,
  makeOptions,
  sendEmail
}
