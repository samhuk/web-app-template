import cors from 'cors'
import { json, Router } from 'express'

const contactExternalService = (onComplete: () => void) => {
  setTimeout(() => {
    onComplete()
  }, 2000)
}

const router = Router()
  .use(cors())
  .use(json())
  .use('/asyncTest', (req, res) => {
    contactExternalService(() => res.send('async test response!'))
  })

export default router