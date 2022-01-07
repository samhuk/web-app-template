import express, { RequestHandler } from 'express'
import api from './api'
import path from 'path'
import * as fs from 'fs'
import livereload from 'livereload'
import connectLivereload from 'connect-livereload'

/* eslint-disable no-console */

const prod = process.env.NODE_ENV === 'production'

const getPort = () => {
  const envDefinedPort = process.env.SERVER_PORT != null ? parseInt(process.env.SERVER_PORT) : null
  if (envDefinedPort == null)
    console.warn('Process environment variable SERVER_PORT not defined. Using default 8080.')
  return envDefinedPort ?? 8080
}

const app = express()

// Hot-reloading
if (!prod) {
  const liveReloadServer = livereload.createServer()
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/")
    }, 100)
  })
  liveReloadServer.watch(path.resolve(__dirname, '../'))
  app.use(connectLivereload())
}

// API request throttling (for simulating slow requests)
if (!prod) {
  const getRequestDelayMs = () => {
    const requestDelayMsRaw = process.env.REQUEST_DELAY_MS != null && process.env.REQUEST_DELAY_MS.length > 0
      ? parseInt(process.env.REQUEST_DELAY_MS)
      : null
    return requestDelayMsRaw != null && !Number.isNaN(requestDelayMsRaw) ? Math.max(requestDelayMsRaw, 0) : null
  }
  const requestDelayMs = getRequestDelayMs()
  if (requestDelayMs != null && requestDelayMs > 0) {
    const delayMiddleware: RequestHandler = (req, res, next) => {
      if (requestDelayMs != null) {
        setTimeout(next, requestDelayMs)
        return
      }
      next()
    }
    app.use('/api', delayMiddleware)
  }
}

// Handle api requests
app
  .use('/api', api)
  // Send 404 for api requests that don't match an api route
  .use('/api', (req, res) => res.sendStatus(404))

// In dev mode we can use the backend to serve client files
if (!prod) {
  const clientDir = path.resolve(__dirname, '../client')
  app
    .get('*', (req, res) => {
      const clientFilePath = path.resolve(clientDir, `./${req.url}`)
      // If the client file exists, serve it
      if (fs.existsSync(clientFilePath))
        res.sendFile(req.url, { root: clientDir })
      // Else send index.html
      else
        res.sendFile('/', { root: clientDir })
    })
}

const port = getPort()
app.listen(port, '0.0.0.0', () => console.log(`API started. Listening on port ${port}.`))
