const { logger } = require('./logger')
const { stackFolder, asyncExec } = require('./utils')
const path = require('path')

async function xo() {
  const formatter = require('eslint-formatter-pretty')
  const target = process.cwd() + '\\**/*.*'
  const rules = require(path.join(process.cwd(), '.eslintrc.rules.js'))
  const ignores = ['**/*.global.js']
  const options = { fix: true, space: true, semicolon: false, rules, ignores, cwd: stackFolder, extension: ['ts', 'js'] }
  const xo = require('xo')
  const report = await xo.lintFiles(target, options)
  xo.outputFixes(report) // apply fixes on the file system
  if ((report.warningCount + report.errorCount) === 0) return logger.success('no lint issues detected')
  logger.log(formatter(report.results))
  if (report.warningCount > 0) logger.log(report.warningCount, 'lint warn found')
  if (report.errorCount <= 0) return
  logger.error(report.errorCount, 'lint errors found')
  process.exit(1)
}

async function repoCheck() {
  logger.consoleLogAllowed = true
  const cli = path.join(process.cwd(), 'node_modules/repo-check/dist/cli.js')
  await asyncExec('node ' + cli)
}

async function lint() {
  await xo()
  await repoCheck()
}

exports.lint = lint
