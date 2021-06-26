import postCssPlugin from '@deanc/esbuild-plugin-postcss'
import { build as esbuild, Format, Platform } from 'esbuild'
import tailwindcss from 'tailwindcss'
import { runPlugin } from './build-run-plugin'
import { logger } from './logger'
import { serve } from './serve'
import { exitWithError, untilUserStop } from './utils'

export async function build (args: string[]): Promise<void> {

  const input = /([\w-]+)\.[jt]s$/.test(args[0]) ? args[0] : 'src/index.ts'
  const options = args.join(' ')
  const platform = String((/--platform[\s=](\S*)/.exec(options) ?? [undefined, 'browser'])[1]) as Platform
  const isBrowser = platform === 'browser'
  const outDirectory = String((/--out-dir[\s=](\S*)/.exec(options) ?? [undefined, isBrowser ? 'public' : 'dist'])[1])
  const format = String((/--format[\s=](\S*)/.exec(options) ?? [undefined, isBrowser ? 'iife' : 'cjs'])[1]) as Format
  const dev = options.includes('--dev')
  const minify = dev ? false : options.includes('--minify')
  const watch = dev || options.includes('--watch')
  const sourcemap = dev || options.includes('--sourcemap')
  const define = (options.includes('--no-global') || isBrowser) ? { global: 'window' } : {}

  const plugins = [postCssPlugin({ plugins: [tailwindcss] })]
  if (options.includes('--run')) plugins.push(runPlugin)

  if (dev) serve(outDirectory).catch(error => logger.error(error))

  const status = await esbuild({
    bundle: true,
    define,
    entryPoints: [input],
    format,
    minify,
    outdir: outDirectory,
    platform,
    plugins,
    sourcemap,
    watch,
  })

  if (status.errors.length > 0) exitWithError(status.errors)
  if (status.warnings.length > 0) logger.log('compilation ended with warnings :', status.warnings)
  else if (watch && !dev) await untilUserStop()
  else logger.log('\ncompilation ended successfully')
}

