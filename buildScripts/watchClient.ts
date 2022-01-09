import chokidar from 'chokidar'
import { buildClient } from './buildClient'
import { printBuildResult } from './buildCommon'

buildClient().then(result => {
  const watcher = chokidar.watch(['./src/client', './src/common'])

  // Being watching for client code changes
  watcher.on('ready', () => {
    console.log('Watching for changes...')
    watcher.on('all', () => {
      console.log(`Changes detected [${new Date().toLocaleTimeString()}], rebuilding client...`)
      const startTime = Date.now()
      // Rebuild client
      result.buildResult.rebuild().then(_result => {
        console.log('Done.')
        printBuildResult(_result, startTime)
        console.log('Watching for changes...')
      }).catch(err => console.log('BUILD ERROR: ', err))
    })
  })
})
