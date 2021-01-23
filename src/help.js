const { cyan } = require('colorette')
const { logger } = require('./logger')

const em = string => cyan(string)

function help() {
  logger.log(`\nHere is how to use stack :\n
  stack ${em('build')} src/my-file.ts
  stack ${em('build')} src/my-file.ts --out-dir public/dist --format iife --minify

  stack ${em('dev')} can/be/a-file.ts
  stack ${em('dev')} or/even/a-folder

  stack ${em('lint')}

  stack ${em('help')}
  `)
}

exports.help = help
