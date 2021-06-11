import path from 'path'
import { logger } from './logger'
import { asyncExec } from './utils'

export async function lint() {
  logger.consoleLogAllowed = true
  let cmd = 'npx xo --fix'
  let result = await asyncExec(cmd)
  logger.debug('xo exited with code', result.code)
  if (result.code !== 0) return process.exit(result.code)
  cmd = path.join(process.cwd(), 'node_modules/repo-check/dist/cli.js')
  result = await asyncExec('node ' + cmd)
  process.exit(result.code)
}

