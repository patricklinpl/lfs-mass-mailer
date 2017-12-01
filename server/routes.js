import { Router } from 'express'
import { parseData } from './email'

const routes = Router()

routes.post('/api/send-email', (req, res) => {
  parseData(req.body, (error) => {
    if (error) {
      res.status(404).send({ msg: 'fail' })
    }
    res.status(200).send({ msg: 'success' })
  })
})

export default routes
