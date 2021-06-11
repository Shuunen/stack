import path from 'path'
import { logger } from './logger.js'
import { serve } from './serve.js'
import { asyncExec, untilUserStop } from './utils.js'

export async function build(options) {
  if (options === undefined || options.length === 0) throw new Error('can\'t build without input')
  const input = options[0]
  options = options.join(' ')
  const outDir = (/--out-dir (\S*)/.exec(options) || [null, 'dist'])[1]
  const format = (/--format (\S*)/.exec(options) || [null, 'cjs'])[1]
  const dev = options.includes('--dev')
  const minify = dev ? false : options.includes('--minify')
  const watch = dev || options.includes('--watch')
  const sourcemap = dev || options.includes('--sourcemap')
  if (dev) serve(outDir)
  const bin = process.platform === 'win32' ? 'esbuild.exe' : 'bin/esbuild'
  const esbuild = path.join(process.cwd(), 'node_modules/esbuild', bin)
  let cmd = `${esbuild} ${input} --bundle --outdir=${outDir} --format=${format}`
  if (sourcemap) cmd += ' --sourcemap'
  if (minify) cmd += ' --minify'
  if (watch) cmd += ' --watch'
  logger.debug('cmd ?', cmd)
  const { code, out } = await asyncExec(cmd, false, false)
  logger.log(out)
  if (watch) await untilUserStop()
  else process.exit(code)
}

