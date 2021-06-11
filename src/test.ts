import path from 'path'
import { watch } from 'chokidar'
import { debounce } from 'shuutils'
import { logger } from './logger.js'
import { asyncExec, readJSON, untilUserStop } from './utils.js'

const target = process.cwd()
const glob = '**/*.{js,ts}'
const folders = [path.join(target, 'tests', glob), path.join(target, 'test', glob)] // these will be watched

async function startTests(cause = 'unknown') {
  logger.debug('tests starts because :', cause)
  await asyncExec('npx nyc mocha')
}

const startTestsDebounced = debounce(startTests, 200)

const watchFolder = (folder = '') => watch(folder).on('all', (event, filename) => startTestsDebounced(`"${event}" detected on "${filename}"`))

async function watchProject() {
  const { files } = await readJSON(path.join(target, 'package.json'))
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

