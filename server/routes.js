import { Router } from 'express'
import { userUpload } from './upload'
import { readCSV } from './parser'

const routes = Router()

routes.post('/api/form', (req, res) => {
  userUpload(req, res, (err) => {
    if (err) {
      res.status(404).send({ type: 'error', msg: err })
    } else {
      readCSV(req.file, (error, data) => {
        if (error) {
          res.status(404).send({ type: 'error', msg: err })
        }
        res.status(200).send({csv: data})
      })
    }
  })
})

export default routes
