const { spawn } = require('child_process')
const { logger } = require('./logger')

function lint() {
  const filepath = 'node_modules/xo/cli.js'
  const process = spawn('node', [filepath, '--fix'])
  process.stdout.on('data', data => logger.error(data))
  process.stderr.on('data', data => logger.error(data))
  process.on('close', code => {
    if (code === 0) logger.success('no lint issues detected')
    else logger.error('lint issue(s) detected')
  })
}

exports.lint = lint
