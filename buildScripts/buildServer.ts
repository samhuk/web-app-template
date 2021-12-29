import * as esbuild from 'esbuild'
import sassPlugin from 'esbuild-sass-plugin'
import * as path from 'path'
import { printBuildResult } from './buildCommon'

const prod = process.env.NODE_ENV === 'production'
const ENTRYPOINT_PATH = './src/server/app.ts'
const OUTPUT_DIR = './build/server'
const OUTPUT_JS_FILENAME = 'out.js'

const startTime = Date.now()
export const buildServer = () => {
  console.log('Building server...')
  return esbuild.build({
    entryPoints: [ENTRYPOINT_PATH],
    outfile: path.resolve(OUTPUT_DIR, OUTPUT_JS_FILENAME),
    bundle: true,
    minify: false, // Doesn't work for some reason when it's true.
    sourcemap: !prod,
    metafile: true,
    platform: 'node',
    external: ['livereload-js'],
    plugins: [sassPlugin() as unknown as esbuild.Plugin, nativeNodeModulesPlugin],
  })
  .then((result) => {
    printBuildResult(result)
    console.log(`    dt: ${(Date.now() - startTime) / 1000} s`)
    return
  })
  .catch((err) => {
    console.log(err)
  })
}

const nativeNodeModulesPlugin = {
  name: 'native-node-modules',
  setup(build: any) {
    // If a ".node" file is imported within a module in the "file" namespace, resolve 
    // it to an absolute path and put it into the "node-file" virtual namespace.
    build.onResolve({ filter: /\.node$/, namespace: 'file' }, (args: any) => ({
      path: require.resolve(args.path, { paths: [args.resolveDir] }),
      namespace: 'node-file',
    }))

    // Files in the "node-file" virtual namespace call "require()" on the
    // path from esbuild of the ".node" file in the output directory.
    build.onLoad({ filter: /.*/, namespace: 'node-file' }, (args: any) => ({
      contents: `
        import path from ${JSON.stringify(args.path)}
        try { module.exports = require(path) }
        catch {}
      `,
    }))

    // If a ".node" file is imported within a module in the "node-file" namespace, put
    // it in the "file" namespace where esbuild's default loading behavior will handle
    // it. It is already an absolute path since we resolved it to one above.
    build.onResolve({ filter: /\.node$/, namespace: 'node-file' }, (args: any) => ({
      path: args.path,
      namespace: 'file',
    }))

    // Tell esbuild's default loading behavior to use the "file" loader for
    // these ".node" files.
    let opts = build.initialOptions
    opts.loader = opts.loader || {}
    opts.loader['.node'] = 'file'
  },
}