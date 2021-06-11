import { run } from 'npm-check-updates'
import { logger } from './logger.js'

export async function update() {
  logger.consoleLogAllowed = true
  const options = { concurrency: 8, errorLevel: 1, format: [], loglevel: 'info', upgrade: true, args: [], cli: true }
  await run(options)
  logger.consoleLogAllowed = false
}
