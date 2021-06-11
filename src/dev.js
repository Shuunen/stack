import { lstat } from 'fs/promises'
import { watch } from 'chokidar'
import { debounce } from 'shuutils'
import { build } from './build.js'
import { serve } from './serve.js'
import { execFile, untilUserStop } from './utils.js'

const execFileDebounced = debounce(execFile, 200)

async function watchJsFile(file) {
  execFileDebounced(file)
  watch(file).on('all', () => execFileDebounced(file))
  await untilUserStop()
}

async function watchJsFolder(folder) {
  watch(folder).on('all', (event, filename) => execFileDebounced(filename))
  await untilUserStop()
}

async function watchFile(file) {
  if (file.includes('.js')) return watchJsFile(file)
  build([file, '--watch --silent'])
  await watchJsFolder('dist')
}

export async function dev(options) {
  if (options === undefined || options.length === 0) throw new Error('can\'t dev without input')
  const input = options[0]
  const stat = await lstat(input)
  if (stat.isDirectory()) return serve(input)
  if (stat.isFile()) return watchFile(input)
  throw new Error('un-handled dev case')
}
