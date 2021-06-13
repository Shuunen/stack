import { logger } from './logger'
import { serve } from './serve'
import { asyncExec, join, stackFolder, untilUserStop } from './utils'

export async function build (args: string[]): Promise<void> {
  if (args === undefined || args.length === 0) throw new Error('can\'t build without input')
  const input = args[0]
  const options = args.join(' ')
  const outDirectory = String((/--out-dir[\s=](\S*)/.exec(options) ?? [undefined, 'dist'])[1])
  const format = String((/--format[\s=](\S*)/.exec(options) ?? [undefined, 'cjs'])[1])
  const platform = String((/--platform[\s=](\S*)/.exec(options) ?? [undefined, 'browser'])[1])
  const dev = options.includes('--dev')
  const minify = dev ? false : options.includes('--minify')
  const watch = dev || options.includes('--watch')
  const sourcemap = dev || options.includes('--sourcemap')
  if (dev) serve(outDirectory).catch(error => logger.error(error))
  const bin = process.platform === 'win32' ? 'esbuild.exe' : 'bin/esbuild' // needed for ubuntu github-ci even if it works on normal ubunutu... -.-''
  const esbuild = join(stackFolder, 'node_modules/esbuild', bin)
  let cmd = `${esbuild} ${input} --bundle --outdir=${outDirectory} --format=${format} --platform=${platform}`
  if (sourcemap) cmd += ' --sourcemap'
  if (minify) cmd += ' --minify'
  if (watch) cmd += ' --watch'
  logger.debug('cmd ?', cmd)
  const { code, out } = await asyncExec(cmd, false, false)
  logger.log(out)
  if (watch) await untilUserStop()
  else process.exit(code)
}

