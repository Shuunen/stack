const { logger } = require('./logger')
const path = require('path')

async function xo() {
  const root = path.join(__dirname, '..')
  const formatter = require(path.join(root, '/node_modules/eslint-formatter-pretty/index.js'))
  const target = process.cwd() + '\\**/*.*'
  const rules = require(path.join(root, '.eslintrc.rules.js'))
  const options = { fix: true, space: true, semicolon: false, rules, cwd: root, extension: ['ts', 'js'] }
  const xo = require(path.join(root, '/node_modules/xo/index.js'))
  const report = await xo.lintFiles(target, options)
  xo.outputFixes(report) // apply fixes on the file system
  if ((report.warningCount + report.errorCount) === 0) return logger.success('no lint issues detected')
  logger.log(formatter(report.results))
  if (report.warningCount > 0) logger.log(report.warningCount, 'lint warn found')
  if (report.errorCount > 0) logger.error(report.errorCount, 'lint errors found')
}

async function lint() {
  await xo()
}

exports.lint = lint
