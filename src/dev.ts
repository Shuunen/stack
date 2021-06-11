import { lstat } from 'fs/promises'
import { watch } from 'chokidar'
import { debounce } from 'shuutils'
import { build } from './build'
import { logger } from './logger'
import { serve } from './serve'
import { execFile, untilUserStop } from './utils'

const execFileDebounced = debounce(execFile, 200)

async function watchJsFile(file: string) {
  execFileDebounced(file).catch(error => logger.error(error))
  watch(file).on('all', async () => execFileDebounced(file).catch(error => logger.error(error)))
  await untilUserStop()
}

async function watchJsFolder(folder: string) {
  logger.debug('watchJsFolder :', folder)
  watch(folder).on('all', async (_event, filename) => execFileDebounced(filename).catch(error => logger.error(error)))
  await untilUserStop()
}

async function watchFile(file: string) {
  logger.debug('watchFile :', file)
  if (file.includes('.js')) return watchJsFile(file).catch(error => logger.error(error))
  build([file, '--watch --silent']).catch(error => logger.error(error))
  await watchJsFolder('dist')
}

export async function dev(options: string[]) {
  if (options === undefined || options.length === 0) throw new Error('can\'t dev without input')
  const input = options[0]
  const stat = await lstat(input)
  if (stat.isDirectory()) return serve(input)
  if (stat.isFile()) return watchFile(input)
  throw new Error('un-handled dev case')
}
