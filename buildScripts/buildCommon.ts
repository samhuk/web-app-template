import { BuildResult } from 'esbuild'
import prettyBytes from 'pretty-bytes'
import * as path from 'path'

/**
 * Prints the result of the given esbuild result to console.
 */
export const printBuildResult = (result: BuildResult, indexHtmlFileSizeBytes?: number, indexHtmlFileOutputPath?: string) => {
  const inputFileCount = Object.keys(result.metafile.inputs).length
  const totalInputFileSizeBytes = Object.values(result.metafile.inputs).reduce((acc, input) => acc += input.bytes, 0)
  const totalOutputFileSizeBytes = Object.values(result.metafile.outputs).reduce((acc, output) => acc += output.bytes, 0)
  // Print input data
  console.log('  Inputs:')
  console.log(`    Input file count: ${inputFileCount} [${prettyBytes(totalInputFileSizeBytes)}]`)
  // Print output data
  console.log('  Outputs:')
  Object.entries(result.metafile.outputs).forEach(([filename, output]) => console.log(`    ${filename} [${prettyBytes(output.bytes)}]`))
  if (indexHtmlFileSizeBytes != null)
    console.log(`    ${path.relative(path.resolve('./'), indexHtmlFileOutputPath)} [${prettyBytes(indexHtmlFileSizeBytes)}]`)
  // Metrics
  console.log('  Metrics:')
  console.log(`    Compression ratio: ${(totalInputFileSizeBytes / totalOutputFileSizeBytes).toFixed(2)}`)
}
