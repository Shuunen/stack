import { watch } from 'chokidar'
import { debounce } from 'shuutils'
import { logger } from './logger'
import { asyncExec, join, readJSON, nodeBin, untilUserStop } from './utils'

const target = process.cwd()
const glob = '**/*.{js,ts}'
const folders = [join(target, 'tests', glob), join(target, 'test', glob)] // these will be watched

async function startTests (cause = 'unknown') {
  logger.debug('tests starts because :', cause)
  return asyncExec(`${nodeBin}/nyc ${nodeBin}/mocha`)
}

const startTestsDebounced = debounce(startTests, 200)

const watchFolder = (folder = '') => watch(folder).on('all', async (event, filename) => startTestsDebounced(`"${event}" detected on "${filename}"`))

async function watchProject () {
  const pkg = await readJSON<packageJson>(join(target, 'package.json'))
  const { files } = pkg
  if (files === undefined) return logger.log('no files section in package.json, only tests folder is being watched')
  files.forEach(item => folders.push(join(target, item, glob)))
  logger.log(folders.length, 'folders are being watched')
  logger.debug(folders)
  folders.forEach(folder => watchFolder(folder))
  await untilUserStop()
}

export async function test (option = ''): Promise<void> {
  logger.log('starting unit tests & coverage with Mocha & Nyc...')
  if (option.includes('watch')) await watchProject()
  const result = await startTests('single run')
  process.exit(result.code)
}

