const { logger } = require('./logger')

async function test(folder) {
  logger.log(`testing : ${folder}`)
}

exports.test = test
