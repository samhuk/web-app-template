import chokidar from 'chokidar'
import { stdout } from 'process';
import { buildServer } from './buildServer'
import { ChildProcess, fork } from 'child_process'
import { printBuildResult } from './buildCommon';

const SERVER_MODULE_PATH = './build/server/out.js'

let serverProc: ChildProcess = null

buildServer().then((result) => {
  // Start initial pre-rebuild server process
  startServer()
  const watcher = chokidar.watch(['./src/server', './src/common'])
  // Being watching for server code changes
  watcher.on('ready', () => {
    watcher.on('all', (a) => {
      // Kill existing server process
      serverProc?.kill()
      stdout.write(`Changes detected [${new Date().toLocaleTimeString()}], rebuilding server...`)
      const startTime = Date.now()
      // Rebuild server
      result.buildResult.rebuild().then((result) => {
        stdout.write(`Done.\n`)
        printBuildResult(result, startTime)
        // Start server again
        startServer()
      });
    })
  })
});

const startServer = () => {
  serverProc = fork(SERVER_MODULE_PATH, { env: { SERVER_PORT: '4001' } });
}
