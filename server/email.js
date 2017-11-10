import nodemailer from 'nodemailer'
require('dotenv').config()

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, 'ig'), replace)
}

const makeBody = (contact, html, headers) => {
  let personalBody = html
  headers.forEach(head => {
    const identifer = `%${head}%`
    personalBody = replaceAll(personalBody, identifer, contact[head])
  })
  return personalBody
}

const parseData = (state, callback) => {
  const email = state.emailID
  let error = false
  state.data.forEach(contact => {
    const body = makeBody(contact, state.html, state.headers)
    const mailOptions = {
      from: `${process.env.ACCOUNT_NAME} <${process.env.ACCOUNT_EMAIL}>`,
      to: contact[email],
      subject: state.subject,
      html: body
    }
    sendEmail(mailOptions, (err) => {
      if (err) {
        error = true
        callback(err)
      }
    })
  })
  if (error === false) {
    callback(null)
  }
}

const sendEmail = (mailOptions, cb) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.ACCOUNT_USER,
      pass: process.env.ACCOUNT_PASS
    }
  })

  transporter.verify((error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Server is ready to take our messages')
    }
  })

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      cb(error)
      return
    }
    return console.log('Message sent: %s', info.messageId)
  })
}

export {
  parseData
}
