import * as fs from 'fs'
import * as path from 'path'
import { BuildResult } from 'esbuild'
import { JSDOM } from 'jsdom'

/**
 * Rudimentary copy of the HtmlPlugin of webpack. Creates a HTML file for the given
 * build result and html index file, adding <script> and <link> elements to reference
 * the output js and css bundles.
 */
export const createIndexHtmlFileText = (result: BuildResult, indexHtmlFilePath: string, outputDir: string): string => {
  let htmlFileText: string = null
  try {
    htmlFileText = fs.readFileSync(indexHtmlFilePath, { encoding: 'utf8' })
  }
  catch (e) {
    console.log('ERROR: Could not access index.html file.', e)
    return ''
  }
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
