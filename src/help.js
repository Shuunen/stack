const { cyan, gray } = require('colorette')
const { logger } = require('./logger')

const em = string => cyan(string)

function help() {
  logger.log(`\nHere is how to use stack :\n
  stack ${em('build')} src/my-file.ts
  stack ${em('build')} src/my-file.ts --out-dir public --format iife --minify
  pro tip : great with a "dev": "npm run build -- --dev", task ^^

  stack ${em('dev')} can/be/a-file.ts
  stack ${em('dev')} or/even/a-folder

  stack ${em('serve')}                  ${gray('# serve the current folder')}
  stack ${em('serve')} specific/folder

  stack ${em('test')}                   ${gray('# will execute unit tests')}
  stack ${em('test')} --watch           ${gray('# will execute unit tests')}

  stack ${em('lint')}

  stack ${em('help')}
  `)
}

exports.help = help
