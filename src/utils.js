const { logger } = require('./logger')
const { pathExistsSync } = require('fs-extra')
const { spawn, exec } = require('child_process')
const path = require('path')

exports.execFile = (...args) => {
  const exists = pathExistsSync(args[0])
  if (!exists) return logger.error('file does not exists :', args[0])
  const child = spawn('node', args)
  child.stdout.on('data', data => logger.log(String(data).trim()))
  child.stderr.on('data', data => logger.error(data.trim()))
}

exports.asyncExec = (cmd, showLog = true) => new Promise((resolve, reject) => {
  const child = exec(cmd)
  child.addListener('error', (code, signal) => reject(new Error(`fail with code ${code} & signal ${signal}`)))
  child.addListener('exit', code => resolve(code))
  if (showLog) child.stdout.on('data', data => logger.log(data.trim()))
  child.stderr.on('data', data => logger.error(data.trim()))
})

exports.untilUserStop = () => new Promise(() => {})

exports.stackFolder = path.join(__dirname, '..')
