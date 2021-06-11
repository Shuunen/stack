#!/usr/bin/env node

import path from 'path'
import { build } from './build.js'
import { dev } from './dev.js'
import { help } from './help.js'
import { info } from './info.js'
import { lint } from './lint.js'
import { logger } from './logger.js'
import { serve } from './serve.js'
import { test } from './test.js'
import { update } from './update.js'
import { readJSON, stackFolder } from './utils.js'

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
  if (intent === 'update') return update()
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

