const { logger } = require('./logger')
const { serve } = require('./serve')
const { untilUserStop } = require('./utils')
const tsup = require('tsup').build

async function build(options) {
  if (options === undefined || options.length === 0) throw new Error('can\'t build without input')
  const input = options[0]
  options = options.join(' ')
  const outDir = (/--out-dir (\S*)/.exec(options) || [null, 'dist'])[1]
  const format = (/--format (\S*)/.exec(options) || [null, 'cjs'])[1]
  let minify = options.includes('--minify')
  const dev = options.includes('--dev')
  const watch = dev || options.includes('--watch')
  const sourcemap = dev || options.includes('--sourcemap')
  if (dev) {
    minify = false
    serve(outDir)
  }
  const verbose = !options.includes('--silent')
  if (verbose) logger.consoleLogAllowed = true
  const config = { outDir, minify, watch, sourcemap, entryPoints: [input], format: [format] }
  await tsup(config)
  logger.consoleLogAllowed = false
  if (watch) await untilUserStop()
}

exports.build = build
