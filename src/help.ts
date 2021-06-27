import { cyan, gray, yellow } from 'colorette'
import { logger } from './logger'

const em1 = (string: string) => cyan(string)
const em2 = (string: string) => yellow(string)
const dim = (string: string) => gray(string)
const line = dim('-------------------------------------------------------------------------------')

export function help (): void {
  logger.log(`\nHow to use stack :\n
  stack ${em1('build')}                      ${dim('# equivalent to the line below')}
  stack ${em1('build')} src/index.ts --out-dir public --format iife --platform browser
  stack ${em1('build')} --format             ${dim('# iife, cjs or esm')}
  stack ${em1('build')} --meta               ${dim('# generate build statistics for tools like https://www.bundle-buddy.com')}
  stack ${em1('build')} --no-global          ${dim('# prevent global var setup for web projects')}
  stack ${em1('build')} --no-minify          ${dim('# prevent minification')}
  stack ${em1('build')} --platform browser   ${dim('# build for web, default format to iife and out-dir to public')}
  stack ${em1('build')} --platform node      ${dim('# build for node, default format to cjs and out-dir to dist')}
  stack ${em1('build')} --run                ${dim('# execute builded file, default platform to node')}
  stack ${em1('build')} --serve              ${dim('# serve build via a local web server with live reload and sourcemap')}
  stack ${em1('build')} --sourcemap          ${dim('# activate sourcemap generation')}
  stack ${em1('build')} --watch              ${dim('# build each times a file is changed')}
  ${line}
  stack ${em2('serve')}                      ${dim('# start a http-server in the current folder')}
  stack ${em2('serve')} my/folder            ${dim('# open a web server locally with live reload')}
  ${line}
  stack ${em1('test')}                       ${dim('# execute unit tests')}
  stack ${em1('test')} --watch               ${dim('# execute unit tests each time a file is changed')}
  ${line}
  stack ${em2('lint')}                       ${dim('# lint js & ts files + repo-check')}
  stack ${em1('update')}                     ${dim('# update all deps to latest')}
  stack ${em2('help')}                       ${dim('# bring this screen')}
  stack ${em1('info')}                       ${dim('# show details about stack app')}
  `)
}

