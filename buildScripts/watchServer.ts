import chokidar from 'chokidar'
import { ChildProcess, fork } from 'child_process'
import { buildServer } from './buildServer'
import { CustomBuildResult, printBuildResult } from './buildCommon'
import { watch } from 'chokidar-debounced'

const SERVER_BUILD_OUTPUT_ENTRYPOINT_PATH = './build/server/out.js'
const DIRS = ['./src/server', './src/common']

let serverProc: ChildProcess = null

const startServer = () => {
  // Start server process with a custom debug port of 5003. This must be kept in-sync with launch.json
  serverProc = fork(SERVER_BUILD_OUTPUT_ENTRYPOINT_PATH, { env: process.env, execArgv: ['--inspect=127.0.0.1:5003'] })
}

const beginRebuildWatch = (buildResult: CustomBuildResult) => {
  watch(() => {
    // Kill existing server process
    serverProc?.kill()
    console.log(`Changes detected [${new Date().toLocaleTimeString()}], rebuilding server...`)
    const startTime = Date.now()
    // Rebuild server
    buildResult.buildResult.rebuild().then(_result => {
      console.log('Done.')
      printBuildResult(_result, startTime)
      // Start server again
      startServer()
      console.log('Watching for changes...')
    }).catch(() => undefined) // Prevent from exiting the process
  }, DIRS, 500, () => console.log('Watching for changes...'))
}

let initialBuildWatcher: chokidar.FSWatcher = null
const main = () => {
  // Try initial build attempt
  buildServer()
    // If initial build successful, start rebuild watch
    .then(result => {
      initialBuildWatcher?.close()
      // Start initial server process, before the first rebuild
      startServer()
      beginRebuildWatch(result)
    })
    .catch(() => {
      if (initialBuildWatcher != null)
        return

      initialBuildWatcher = chokidar.watch(DIRS)
      watch(() => main(), initialBuildWatcher, 500, () => console.log('Watching for changes...'))
    })
}

main()