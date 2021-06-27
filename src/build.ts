import postCssPlugin from '@deanc/esbuild-plugin-postcss'
import { build as esbuild, Format, Platform } from 'esbuild'
import { writeFileSync } from 'fs'
import tailwindcss from 'tailwindcss'
import { runPlugin } from './build-run-plugin'
import { logger } from './logger'
import { serve } from './serve'
import { exitWithError, untilUserStop } from './utils'

export async function build (args: string[]): Promise<void> {

  const input = /([\w-]+)\.[jt]s$/.test(args[0]) ? args[0] : 'src/index.ts'
  const options = args.join(' ')
  const run = options.includes('--run')
  const platform = String((/--platform[\s=](\S*)/.exec(options) ?? [undefined, run ? 'node' : 'browser'])[1]) as Platform
  const isBrowser = platform === 'browser'
  const outDirectory = String((/--out-dir[\s=](\S*)/.exec(options) ?? [undefined, isBrowser ? 'public' : 'dist'])[1])
  const format = String((/--format[\s=](\S*)/.exec(options) ?? [undefined, isBrowser ? 'iife' : 'cjs'])[1]) as Format
  const minify = !options.includes('--no-minify')
  const watch = options.includes('--watch')
  const metafile = options.includes('--meta')
  const doServe = options.includes('--serve')
  const sourcemap = options.includes('--sourcemap') || (isBrowser && doServe)
  const define = (!options.includes('--no-global') && isBrowser) ? { global: 'window' } : {}
  const plugins = isBrowser ? [postCssPlugin({ plugins: [tailwindcss] })] : []

  if (run) plugins.push(runPlugin)

  if (doServe) serve(outDirectory).catch(error => logger.error(error))

  const config = {
    bundle: true,
    define,
    entryPoints: [input],
    format,
    metafile,
    minify,
    outdir: outDirectory,
    platform,
    plugins,
    sourcemap,
    watch,
  }
  logger.debug('build options', options)
  logger.debug('esbuild config', config)
  const status = await esbuild(config)

  if (status.errors.length > 0) exitWithError(status.errors)
  if (status.warnings.length > 0) logger.log('compilation ended with warnings :', status.warnings)
  else if (watch) return untilUserStop()
  logger.log('\ncompilation ended successfully')
  if (status.metafile) writeFileSync('meta.json', JSON.stringify(status.metafile))
}

