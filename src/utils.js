const { spawn } = require('child_process')
const { logger } = require('./logger')

const execFile = (...args) => {
  const process = spawn('node', args)
  process.stdout.on('data', data => logger.log(String(data)))
  process.stderr.on('data', data => logger.error(data))
}

exports.execFile = execFile
