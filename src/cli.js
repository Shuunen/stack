#!/usr/bin/env node

const [command, ...options] = process.argv.slice(2)
let intent = command ? command.replace('--', '') : ''
if (intent === '') intent = 'help'

console.log('\nstack run with intent :', intent)

if (options.length > 0) console.log('and options :', options)
