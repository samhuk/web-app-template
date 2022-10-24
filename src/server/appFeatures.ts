import { Express } from 'express'
import path from 'path'
import livereload from 'livereload'
import connectLivereload from 'connect-livereload'

export const addHotReloadingMiddleware = (app: Express): void => {
  const liveReloadServer = livereload.createServer()
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/')
    }, 100)
  })
  liveReloadServer.watch(path.resolve(__dirname, '../'))
  app.use(connectLivereload())
}

export const addRequestDelayMiddlewareIfSpecified = (app: Express): void => {
  const getRequestDelayMs = () => {
    const requestDelayMsRaw = process.env.REQUEST_DELAY_MS != null && process.env.REQUEST_DELAY_MS.length > 0
      ? parseInt(process.env.REQUEST_DELAY_MS)
      : null
    return requestDelayMsRaw != null && !Number.isNaN(requestDelayMsRaw) ? Math.max(requestDelayMsRaw, 0) : null
  }
  const requestDelayMs = getRequestDelayMs()
  if (requestDelayMs == null || requestDelayMs <= 0)
    return

  app.use('/api', (req, res, next) => {
    if (requestDelayMs != null) {
      setTimeout(next, requestDelayMs)
      return
    }
    next()
  })
}
