const { logger } = require('./logger')
const { execFile } = require('./utils')

async function test(options = []) {
  logger.log('starting unit tests via Mocha...')
  const bin = `${process.cwd()}/node_modules/shuunen-stack/node_modules/mocha/bin/mocha`
  options.unshift(bin)
  execFile(...options)
}

exports.test = test
