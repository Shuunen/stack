import { PluginBuild } from 'esbuild'
import { logger } from './logger'
import { execFile, exitWithError, join } from './utils'

export const runPlugin = {
  name: 'run',
  setup (build: PluginBuild): void {
    const { entryPoints, outdir } = build.initialOptions
    const filename = entryPoints[0].match(/([\w-]+)\.[jt]s$/)[1]
    const file = join(outdir, filename + '.js')
    logger.debug('expected output file', file)
    build.onEnd(status => {
      /* istanbul ignore next */
      if (status.errors.length > 0) exitWithError(status.errors)
      console.log('')
      execFile(file)
    })
  },
}
