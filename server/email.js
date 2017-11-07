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

const parseData = (state) => {
  const email = state.emailID
  state.data.forEach(contact => {
    const body = makeBody(contact, state.html, state.headers)
    const mailOptions = {
      from: `${process.env.ACCOUNT_NAME} <${process.env.ACCOUNT_EMAIL}>`,
      to: contact[email],
      subject: state.subject,
      html: body
    }
    sendEmail(mailOptions)
  })
}

const sendEmail = (mailOptions) => {
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ubc.ca',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ACCOUNT_USER,
        pass: process.env.ACCOUNT_PASS
      }
    })

    if (err) {
      return console.log(err)
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    })
  })
}

export {
    sendEmail
}
