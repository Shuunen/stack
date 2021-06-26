import { cyan, gray, yellow } from 'colorette'
import { logger } from './logger'

const em1 = (string: string) => cyan(string)
const em2 = (string: string) => yellow(string)
const dim = (string: string) => gray(string)
const line = dim('-------------------------------------------------------------------------------')

export function help (): void {
  logger.log(`\nHow to use stack :\n
  stack ${em1('build')}                 ${dim('# equivalent to the line below')}
  stack ${em1('build')} src/index.ts --out-dir public --format iife --platform browser
  stack ${em1('build')} --dev           ${dim('# build, watch & open a web server locally with live reload and source maps')}
  stack ${em1('build')} src/file.ts --platform node --minify --watch --run
  ${line}
  stack ${em2('dev')}                   ${dim('# alias for : build --dev')}
  stack ${em2('dev')} src/file.ts       ${dim('# alias for : build src/file.ts --watch --run')}
  stack ${em2('dev')} my/folder         ${dim('# alias for : serve my/folder')}
  ${line}
  stack ${em1('serve')}                 ${dim('# start a http-server in the current folder')}
  stack ${em1('serve')} my/folder       ${dim('# open a web server locally with live reload')}
  ${line}
  stack ${em2('test')}                  ${dim('# execute unit tests')}
  stack ${em2('test')} --watch          ${dim('# execute unit tests')}
  ${line}
  stack ${em1('update')}                ${dim('# update all deps to latest')}
  stack ${em2('lint')}                  ${dim('# lint js & ts files + repo-check')}
  stack ${em1('info')}                  ${dim('# show details about stack app')}
  stack ${em2('help')}                  ${dim('# bring this screen')}
  `)
}

