import chokidar from 'chokidar'
import { ChildProcess, fork } from 'child_process'
import { buildServer } from './buildServer'
import { printBuildResult } from './buildCommon'

const SERVER_MODULE_PATH = './build/server/out.js'

let serverProc: ChildProcess = null

const startServer = () => {
  serverProc = fork(SERVER_MODULE_PATH, { env: { SERVER_PORT: '4001' } })
}

buildServer().then(result => {
  // Start initial pre-rebuild server process
  startServer()
  const watcher = chokidar.watch(['./src/server', './src/common'])
  // Begin watching for server code changes
  watcher.on('ready', () => {
    console.log('Watching for changes...')
    watcher.on('all', () => {
      // Kill existing server process
      serverProc?.kill()
      console.log(`Changes detected [${new Date().toLocaleTimeString()}], rebuilding server...`)
      const startTime = Date.now()
      // Rebuild server
      result.buildResult.rebuild().then(_result => {
        console.log('Done.')
        printBuildResult(_result, startTime)
        // Start server again
        startServer()
        console.log('Watching for changes...')
      })
    })
  })
})
