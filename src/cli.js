#!/usr/bin/env node

const { red } = require('colorette')
const { readJSON } = require('fs-extra')
const path = require('path')
const { build } = require('./build')
const { help } = require('./help')
const { lint } = require('./lint')

async function start() {
  const [command, ...options] = process.argv.slice(2)
  let intent = command ? command.replace('--', '') : ''
  if (intent === '') intent = 'help'
  const pkg = await readJSON(path.join(__dirname, '../package.json'))
  console.log(`\nstack v${pkg.version} is starting...\n`)
  if (intent === 'build') return build(options)
  if (intent === 'lint') return lint()
  return help(intent)
}

start().catch(error => console.error(red(error.message)))

