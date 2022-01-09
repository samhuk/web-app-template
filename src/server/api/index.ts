import cors from 'cors'
import { json, Router } from 'express'
import { successResponse } from './responses'

const router = Router()
  .use(cors())
  .use(json())
  .use('/healthcheck', (req, res) => {
    successResponse(req, res, true)
  })

export default router