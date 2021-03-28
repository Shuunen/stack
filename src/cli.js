#!/usr/bin/env node

const { build } = require('./build')
const { dev } = require('./dev')
const { help } = require('./help')
const { info } = require('./info')
const { lint } = require('./lint')
const { logger } = require('./logger')
const { readJSON } = require('fs-extra')
const { serve } = require('./serve')
const { stackFolder } = require('./utils')
const { test } = require('./test')
const path = require('path')

async function start() {
  const [command, ...options] = process.argv.slice(2)
  const args = options.join().trim()
  let intent = command ? command.replace('--', '') : ''
  if (intent === '') intent = 'help'
  const pkg = await readJSON(path.join(stackFolder, 'package.json'))
  logger.debugEnabled = args.includes('--debug') || args.includes('--verbose')
  logger.debug(`intent : "${intent}"`)
  logger.debug(`args : "${args}"`)
  if (intent === '-v' || intent === 'info') return info(pkg)
  logger.log(`stack v${pkg.version} is starting...`)
  if (intent === 'build') return build(options)
  if (intent === 'lint') return lint()
  if (intent === 'dev') return dev(options)
  if (intent === 'serve') return serve(options[0])
  if (intent === 'test') return test(options[0])
  if (intent === 'help') return help()
  throw new Error(`intent not handled : ${intent}\n`)
}

start().then(() => {
  logger.debug('stack ended normally')
  process.exit(0)
}).catch(error => {
  logger.debug('stack ended abnormally')
  logger.error(error.message)
  logger.debug(error)
  help()
  process.exit(1)
})

