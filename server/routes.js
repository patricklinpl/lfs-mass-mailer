import { Router } from 'express'
import { userUpload } from './upload'
import { parseCSV } from './parser'

const routes = Router()

routes.post('/api/form', (req, res) => {
  userUpload(req, res, (err) => {
    if (err) {
      res.status(404).send({ type: 'error', msg: err })
    } else {
      parseCSV(req.body, req.file)
      res.status(200).send({me: 'hi'})
    }
  })
})

export default routes
