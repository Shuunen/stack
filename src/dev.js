const { lstat } = require('fs').promises
const { watch } = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const { debounce } = require('shuutils')
const { build } = require('./build')
const { logger } = require('./logger')
const { serve } = require('./serve')

const execFile = file => {
  if (!file.includes('.js')) throw new Error('can\'t execute non-js files')
  const process = spawn('node', [file])
  process.stdout.on('data', data => logger.log(String(data)))
  process.stderr.on('data', data => logger.error(data))
}

const execFileDebounced = debounce(execFile, 200)

function watchJsFile(file) {
  execFileDebounced(file)
  watch(file, () => execFileDebounced(file))
}

function watchJsFolder(folder) {
  watch(folder, (type, filename) => execFileDebounced(path.join(folder, filename)))
}

function watchFile(file) {
  if (file.includes('.js')) return watchJsFile(file)
  build([file, '--watch --silent'])
  watchJsFolder('dist')
}

async function dev(options) {
  if (options === undefined || options.length === 0) throw new Error('can\'t dev without input')
  const input = options[0]
  const stat = await lstat(input)
  if (stat.isDirectory()) return serve(input)
  if (stat.isFile()) return watchFile(input)
  throw new Error('un-handled dev case')
}

exports.dev = dev
