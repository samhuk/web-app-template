import chokidar from 'chokidar'
import { stdout } from 'process';
import { buildClient } from './buildClient'
import { printBuildResult } from './buildCommon';

buildClient().then((result) => {
  const watcher = chokidar.watch(['./src/client', './src/common'])

  // Being watching for client code changes
  watcher.on('ready', () => {
    watcher.on('all', (a) => {
      stdout.write(`Changes detected [${new Date().toLocaleTimeString()}], rebuilding client...`)
      const startTime = Date.now()
      // Rebuild client
      result.buildResult.rebuild().then((result) => {
        stdout.write(`Done.\n`)
        printBuildResult(result, startTime)
      });
    })
  })
});
