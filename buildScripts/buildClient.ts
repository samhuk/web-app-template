import * as esbuild from 'esbuild'
import sassPlugin from 'esbuild-sass-plugin'
import * as fs from 'fs'
import * as path from 'path'
import { printBuildResult } from './buildCommon'
import { createIndexHtmlFileText } from './esbuildHtmlFilePlugin'

const prod = process.env.NODE_ENV === 'production'
const INDEX_HTML_FILE_PATH = './src/client/index.html'
const ENTRYPOINT_PATH = './src/client/main.tsx'
const OUTPUT_DIR = './build/client'
const OUTPUT_JS_FILENAME = 'out.js'

const indexHtmlFileOutputPath = path.relative(path.resolve('./'), path.resolve(OUTPUT_DIR, 'index.html'))

export const buildClient = () => {
  console.log('Building client...')
  const startTime = Date.now()
  return esbuild.build({
    entryPoints: [ENTRYPOINT_PATH],
    outfile: path.resolve(OUTPUT_DIR, OUTPUT_JS_FILENAME),
    bundle: true,
    minify: prod,
    sourcemap: !prod,
    metafile: true,
    plugins: [sassPlugin() as unknown as esbuild.Plugin],
  })
  .then((result) => {
    const indexHtmlFileText = createIndexHtmlFileText(result, INDEX_HTML_FILE_PATH, OUTPUT_DIR)
    printBuildResult(result, Buffer.from(indexHtmlFileText).length, indexHtmlFileOutputPath)
    fs.writeFileSync(indexHtmlFileOutputPath, indexHtmlFileText)
    console.log(`    dt: ${(Date.now() - startTime) / 1000} s`)
    return
  })
  .catch((err) => {
    console.log(err)
  })
}
