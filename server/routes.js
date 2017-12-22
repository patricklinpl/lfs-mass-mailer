import { Router } from 'express'
import { parseData } from './email'

const routes = Router()

routes.post('/api/send-email', (req, res) => {
  parseData(req.body)
  .then(() => res.status(200).send({ msg: 'success' }))
  .catch(error => (res.status(404).send({ msg: 'fail', error: error.message })))
})

export default routes
