import { watch } from 'chokidar'
import path from 'path' // eslint-disable-line import/order
import { debounce } from 'shuutils'
import { logger } from './logger'
import { asyncExec, readJSON, untilUserStop } from './utils'

const target = process.cwd()
const glob = '**/*.{js,ts}'
const folders = [path.join(target, 'tests', glob), path.join(target, 'test', glob)] // these will be watched

async function startTests(cause = 'unknown') {
  logger.debug('tests starts because :', cause)
  await asyncExec('npx nyc mocha')
}

const startTestsDebounced = debounce(startTests, 200)

const watchFolder = (folder = '') => watch(folder).on('all', async (event, filename) => startTestsDebounced(`"${event}" detected on "${filename}"`))

async function watchProject() {
  const pkg = await readJSON<packageJson>(path.join(target, 'package.json'))
  const { files } = pkg
  if (files === undefined) return logger.log('no files section in package.json, only tests folder is being watched')
  files.forEach(item => folders.push(path.join(target, item, glob)))
  logger.log(folders.length, 'folders are being watched')
  logger.debug(folders)
  folders.forEach(folder => watchFolder(folder))
  await untilUserStop()
}

export async function test(option = '') {
  logger.log('starting unit tests & coverage with Mocha & Nyc...')
  await (option.includes('watch') ? watchProject() : startTestsDebounced('single run'))
}

