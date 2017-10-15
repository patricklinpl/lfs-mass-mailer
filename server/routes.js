import { Router } from 'express'
import { userUpload } from './upload'

const routes = Router()

routes.post('/api/form', (req, res) => {
  userUpload(req, res, (err) => {
    if (err) {
      res.status(404).send({ type: 'error', msg: err })
    } else {
      res.status(200).send({me: 'hi'})
    }
  })
})

export default routes
