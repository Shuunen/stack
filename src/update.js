const { logger } = require('./logger')

exports.update = async function update() {
  logger.consoleLogAllowed = true
  const options = { concurrency: 8, errorLevel: 1, format: [], loglevel: 'warn', upgrade: true, args: [], cli: true }
  await require('npm-check-updates').run(options)
  logger.consoleLogAllowed = false
}
