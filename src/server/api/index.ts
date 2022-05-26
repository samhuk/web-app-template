import cors from 'cors'
import { json, Router } from 'express'
import { sendSuccessResponse } from './responses'

const startTime = new Date()
const startTimeUnixOffset = startTime.getTime()

const router = Router()
  .use(cors())
  .use(json())
  .use('/healthcheck', (req, res) => {
    const upTime = Date.now() - startTimeUnixOffset
    sendSuccessResponse(req, res, {
      startTime,
      startTimeUnixOffset,
      upTimeMs: upTime,
      upTimeHours: upTime / 1000 / 60 / 60,
    })
  })

export default router
