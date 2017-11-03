import { Router } from 'express'
import { userUpload } from './upload'
import { readCSV } from './parser'
import { sendEmail } from './email'

const routes = Router()

routes.post('/api/form', (req, res) => {
  userUpload(req, res, (err) => {
    if (err) {
      console.log(err)
      res.status(404).send({ type: 'error', msg: err })
    } else {
      readCSV(req.file, (error, data) => {
        if (error) {
          console.log(error)
          res.status(404).send({ type: 'error', msg: 'No File Uploaded!' })
        } else {
          res.status(200).send({csv: data})
        }
      })
    }
  })
})

routes.post('/api/send-email', (req, res) => {
  sendEmail(() => {
    res.status(200).send('success')
  })
})

export default routes
