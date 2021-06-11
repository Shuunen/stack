import path from 'path'
import { logger } from './logger'
import { serve } from './serve'
import { asyncExec, untilUserStop } from './utils'

export async function build(options: string[]) {
  if (options === undefined || options.length === 0) throw new Error('can\'t build without input')
  const input = options[0]
  const outDirectory = String((/--out-dir (\S*)/.exec(options.join(' ')) ?? [null, 'dist'])[1])
  const format = String((/--format (\S*)/.exec(options.join(' ')) ?? [null, 'cjs'])[1])
  const dev = options.includes('--dev')
  const minify = dev ? false : options.includes('--minify')
  const watch = dev || options.includes('--watch')
  const sourcemap = dev || options.includes('--sourcemap')
  if (dev) serve(outDirectory).catch(error => logger.error(error))
  const bin = process.platform === 'win32' ? 'esbuild.exe' : 'bin/esbuild'
  const esbuild = path.join(process.cwd(), 'node_modules/esbuild', bin)
  let cmd = `${esbuild} ${input} --bundle --outdir=${outDirectory} --format=${format}`
  if (sourcemap) cmd += ' --sourcemap'
  if (minify) cmd += ' --minify'
  if (watch) cmd += ' --watch'
  logger.debug('cmd ?', cmd)
  const { code, out } = await asyncExec(cmd, false, false)
  logger.log(out)
  if (watch) await untilUserStop()
  else process.exit(code)
}

