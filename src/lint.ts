import { logger } from './logger'
import { asyncExec, exitWithError, join, nodeBin, stackFolder } from './utils'

export async function lint (): Promise<void> {
  const config = join(stackFolder, '.eslintrc.json')
  let result = await asyncExec(`${nodeBin}/eslint --fix --ignore-path .gitignore --config=${config} --ext .js,.ts,.html .`)
  logger.debug('eslint exited with code', result.code)
  if (result.code !== 0) exitWithError('eslint step failed')
  result = await asyncExec(`${nodeBin}/repo-check`)
  if (result.code !== 0) exitWithError('repo-check step failed')
}

