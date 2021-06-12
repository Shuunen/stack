import path from 'path'
import { logger } from './logger'
import { asyncExec, stackFolder } from './utils'

export async function lint (): Promise<void> {
  logger.consoleLogAllowed = true
  const config = path.join(stackFolder, '.eslintrc.json')
  let cmd = path.join(stackFolder, `./node_modules/.bin/eslint --fix --ignore-path .gitignore --config=${config} --ext .js,.ts,.html .`)
  let result = await asyncExec(cmd)
  logger.debug('eslint exited with code', result.code)
  if (result.code !== 0) return process.exit(result.code)
  cmd = path.join(stackFolder, 'node_modules/repo-check/dist/cli.js')
  result = await asyncExec('node ' + cmd)
  process.exit(result.code)
}

