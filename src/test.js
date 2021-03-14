const { debounce } = require('shuutils')
const { execFile } = require('./utils')
const { logger } = require('./logger')
const { readJSON } = require('fs-extra')
const { watch } = require('chokidar')
const path = require('path')

const target = process.cwd()
const nyc = `${target}/node_modules/shuunen-stack/node_modules/nyc/bin/nyc`
const mocha = `${target}/node_modules/shuunen-stack/node_modules/mocha/bin/mocha`
const glob = '**/*.{js,ts}'
const folders = [path.join(target, 'tests', glob)] // these will be watched

function startTests(cause = 'unknown') {
  logger.debug('tests starts because :', cause)
  execFile(nyc, mocha)
}

const startTestsDebounced = debounce(startTests, 200)

const watchFolder = async (folder = '') => watch(folder).on('all', (event, filename) => startTestsDebounced(`"${event}" detected on "${filename}"`))

async function watchProject() {
  const { files } = await readJSON(path.join(target, 'package.json'))
  if (files === undefined) return logger.log('no files section in package.json, only tests folder is being watched')
  files.forEach(item => folders.push(path.join(target, item, glob)))
  logger.log(folders.length, 'folders are being watched')
  logger.debug(folders)
  folders.forEach(folder => watchFolder(folder))
}

async function test(option = '') {
  logger.log('starting unit tests & coverage with Mocha & Nyc...')
  startTestsDebounced('initial run')
  if (option.includes('watch')) watchProject().catch(error => logger.error('failed to watch project :', error.message))
}

exports.test = test
