import { cyan, gray } from 'colorette'
import { logger } from './logger.js'

const em = string => cyan(string)

export function help() {
  logger.log(`\nHow to use stack :\n
  stack ${em('build')} src/my-file.ts
  stack ${em('build')} src/my-file.ts --out-dir public --format iife --minify
  ${gray('pro tip : great with a "dev": "npm run build -- --dev", task ^^')}
  stack ${em('dev')} can/be/a-file.ts
  stack ${em('dev')} or/even/a-folder
  stack ${em('serve')}                  ${gray('# start a http-server in the current folder')}
  stack ${em('serve')} specific/folder
  stack ${em('test')}                   ${gray('# will execute unit tests')}
  stack ${em('test')} --watch           ${gray('# will execute unit tests')}
  stack ${em('update')}                 ${gray('# will update all deps to latest')}
  stack ${em('lint')}                   ${gray('# will lint js & ts files + repo-check')}
  stack ${em('info')}                   ${gray('# show details about the app')}
  stack ${em('help')}                   ${gray('# bring this screen')}
  `)
}

