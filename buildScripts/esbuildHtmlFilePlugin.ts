import * as fs from 'fs'
import * as path from 'path'
import { BuildResult } from 'esbuild'
import { JSDOM } from 'jsdom'

/**
 * Rudimentary copy of HtmlPlugin (of webpack)
 */
export const createIndexHtmlFileText = (result: BuildResult, indexHtmlFilePath: string, outputDir: string): string => {
  const htmlFileText = fs.readFileSync(indexHtmlFilePath, { encoding: 'utf8' })
  const jsdom = new JSDOM(htmlFileText)
  const document = jsdom.window.document

  if (document.head == null)
    console.log('ERROR: index.html file does not have a <head> element.')

  Object.entries(result.metafile.outputs).forEach(([outputPath, output]) => {
    const relativizedPath = path.relative(outputDir, outputPath)
    if (outputPath.endsWith('.js')) {
      const scriptEl = document.createElement('script')
      scriptEl.defer = true
      scriptEl.src = `/${relativizedPath}`
      document.head.appendChild(scriptEl)
    }
    else if (outputPath.endsWith('.css')) {
      const linkEl = document.createElement('link')
      linkEl.rel = 'stylesheet'
      linkEl.href = `/${relativizedPath}`
      document.head.appendChild(linkEl)
    }
  })

  return jsdom.serialize()
}