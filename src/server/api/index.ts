import cors from 'cors'
import { json, Router } from 'express'

const router = Router()
  .use(cors())
  .use(json())
  .use('/healthcheck', (req, res) => {
    res.sendStatus(200)
  })

export default router