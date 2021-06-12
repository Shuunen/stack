import { logger } from './logger'
import { asyncExec } from './utils'

export async function update() {
  logger.consoleLogAllowed = true
  const result = await asyncExec('npx npm-check-updates -u')
  process.exit(result.code)
}
