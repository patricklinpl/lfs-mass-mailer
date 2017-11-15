import { Router } from 'express'
import { userUpload } from './upload'
import { readCSV } from './parser'
import { parseData } from './email'

const routes = Router()

routes.post('/api/form', (req, res) => {
  userUpload(req, res, (e) => {
    if (e) {
      console.log(e)
      res.status(404).send({ type: 'error', msg: e.message })
    } else {
      readCSV(req.file).then(data => res.status(200).send({csv: data}))
      .catch(e => {
        console.log(e)
        res.status(404).send({ type: 'error', msg: e.message })
      })
    }
  })
})

routes.post('/api/send-email', (req, res) => {
  parseData(req.body, (error) => {
    if (error) {
      res.status(404).send({msg: 'fail'})
    } else {
      res.status(200).send({msg: 'success'})
    }
  })
})

export default routes
