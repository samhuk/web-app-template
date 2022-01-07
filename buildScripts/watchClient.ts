import chokidar from 'chokidar'
import { stdout } from 'process';
import { buildClient } from './buildClient'
import { printBuildResult } from './buildCommon';

buildClient().then((result) => {
  const watcher = chokidar.watch(['./src/client', './src/common'])

  // Being watching for client code changes
  watcher.on('ready', () => {
    console.log('Watching for changes...');
    watcher.on('all', (a) => {
      console.log(`Changes detected [${new Date().toLocaleTimeString()}], rebuilding client...`)
      const startTime = Date.now()
      // Rebuild client
      result.buildResult.rebuild().then((result) => {
        console.log(`Done.`)
        printBuildResult(result, startTime)
        console.log('Watching for changes...')
      });
    })
  })
});
