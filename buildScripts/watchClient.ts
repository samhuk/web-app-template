import chokidar from 'chokidar'
import { buildClient } from './buildClient'
import { CustomBuildResult, printBuildResult } from './buildCommon'
import { watch } from 'chokidar-debounced'

const buildVerbosity = process.env.BUILD_VERBOSITY != null ? parseInt(process.env.BUILD_VERBOSITY) : 1
const DIRS = ['./src/client', './src/common']

const startRebuildWatch = (buildResult: CustomBuildResult) => {
  watch(() => {
    console.log(`Changes detected [${new Date().toLocaleTimeString()}], rebuilding client...`)
    const startTime = Date.now()
    // Rebuild client
    buildResult.buildResult.rebuild()
      .then(_result => {
        console.log(`Done (${Date.now() - startTime} ms).${buildVerbosity === 0 ? ' Watching for changes...' : ''}`)
        if (buildVerbosity > 0) {
          printBuildResult(_result, startTime)
          console.log('Watching for changes...')
        }
      })
      .catch(() => undefined) // Prevent from exiting the process
  }, DIRS, 500, () => { console.log('Watching for changes...') })
}

let initialBuildWatcher: chokidar.FSWatcher = null
const main = () => {
  // Try initial build attempt
  buildClient()
    // If initial build successful, start rebuild watch
    .then(result => {
      initialBuildWatcher.close()
      startRebuildWatch(result)
    })
    .catch(() => {
      if (initialBuildWatcher != null)
        return
      initialBuildWatcher = chokidar.watch(DIRS)

      initialBuildWatcher.on('ready', () => {
        console.log('Watching for changes...')
        initialBuildWatcher.on('all', () => {
          main() // Try initial build attempt again
        })
      })
    })
}

main()
