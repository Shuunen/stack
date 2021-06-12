#!/usr/bin/env node

import path from 'path'
import { build } from './build'
import { dev } from './dev'
import { help } from './help'
import { info } from './info'
import { lint } from './lint'
import { logger } from './logger'
import { serve } from './serve'
import { test } from './test'
import { update } from './update'
import { readJSON, stackFolder } from './utils'

async function start () {
  const [command, ...options] = process.argv.slice(2)
  const args = options.join('').trim()
  let intent = command ? command.replace('--', '') : ''
  if (intent === '') intent = 'help'
  const pkg = await readJSON<packageJson>(path.join(stackFolder, 'package.json'))
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

start().catch((error: Error) => {
  logger.debug('stack ended abnormally')
  logger.error(error.message)
  logger.debug(error)
  help()
  process.exit(1)
})

