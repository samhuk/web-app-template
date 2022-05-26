import * as esbuild from 'esbuild'
import sassPlugin from 'esbuild-sass-plugin'
import * as fs from 'fs'
import * as path from 'path'
import { createBuilder } from './buildCommon'
import { createIndexHtmlFileText } from './esbuildHtmlFilePlugin'

const prod = process.env.NODE_ENV === 'production'
const INDEX_HTML_FILE_PATH = './src/client/index.html'
const FAVICON_FILE_PATH = './src/client/favicon.ico'
const ENTRYPOINT_PATH = './src/client/main.tsx'
const OUTPUT_DIR = './build/client'
const OUTPUT_JS_FILENAME = 'out.js'

const indexHtmlFileOutputPath = path.relative(path.resolve('./'), path.resolve(OUTPUT_DIR, 'index.html'))
const faviconFileOutputPath = path.relative(path.resolve('./'), path.resolve(OUTPUT_DIR, 'favicon.ico'))

export const buildClient = createBuilder('client', () => esbuild.build({
  entryPoints: [ENTRYPOINT_PATH],
  outfile: path.resolve(OUTPUT_DIR, OUTPUT_JS_FILENAME),
  bundle: true,
  minify: prod,
  sourcemap: !prod,
  metafile: true,
  incremental: !prod,
  plugins: [sassPlugin() as unknown as esbuild.Plugin],
  loader: {
    '.ttf': 'file',
    '.woff': 'file',
    '.woff2': 'file',
  },
}).then(result => {
  // Create index.html file, referencing build outputs
  const indexHtmlFileText = createIndexHtmlFileText(result, INDEX_HTML_FILE_PATH, OUTPUT_DIR)
  // Copy over additional related files to build dir
  fs.writeFileSync(indexHtmlFileOutputPath, indexHtmlFileText)
  fs.copyFileSync(FAVICON_FILE_PATH, faviconFileOutputPath)
  return {
    buildResult: result,
    additionalOutputs: [
      { path: indexHtmlFileOutputPath, sizeBytes: Buffer.from(indexHtmlFileText).length },
      { path: faviconFileOutputPath, sizeBytes: fs.statSync(FAVICON_FILE_PATH).size },
    ],
  }
}))
