#!/usr/bin/env node

const { build } = require('./build')
const { dev } = require('./dev')
const { help } = require('./help')
const { lint } = require('./lint')
const { logger } = require('./logger')
const { readJSON } = require('fs-extra')
const path = require('path')

async function start() {
  const [command, ...options] = process.argv.slice(2)
  let intent = command ? command.replace('--', '') : ''
  if (intent === '') intent = 'help'
  const pkg = await readJSON(path.join(__dirname, '../package.json'))
  logger.log(`stack v${pkg.version} is starting...\n`)
  if (intent === 'build') return build(options)
  if (intent === 'lint') return lint()
  if (intent === 'dev') return dev(options)
  if (intent === 'help') return help()
  throw new Error(`intent not handled : ${intent}\n`)
}

start().catch(error => {
  logger.error(error.message)
  help()
})

