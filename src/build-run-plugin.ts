import { PluginBuild } from 'esbuild'
import { lstatSync } from 'fs'
import { logger } from './logger'
import { execFile, exitWithError, join } from './utils'

export const runPlugin = {
  name: 'run',
  setup (build: PluginBuild): void {
    const { entryPoints, outdir } = build.initialOptions
    const filename = (entryPoints[0].match(/([\w-]+)\.[jt]s$/) || [])[1]
    if (!filename) exitWithError('failed to estimate output filename')
    const file = join(outdir, filename + '.js')
    const stats = lstatSync(file)
    if (!stats.isFile()) exitWithError('failed to estimate output file')
    logger.debug('output file', file)
    build.onEnd(status => {
      if (status.errors.length > 0) exitWithError(status.errors)
      console.log('')
      execFile(file)
    })
  },
}
