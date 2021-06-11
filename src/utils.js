import { exec, spawn } from 'child_process'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import jsonfile from 'jsonfile'
import { logger } from './logger.js'

const { readFile } = jsonfile

const clean = output => output.replace(/\n$/, '')

export const execFile = (...args) => {
  const exists = existsSync(args[0])
  if (!exists) return logger.error('file does not exists :', args[0])
  const child = spawn('node', args)
  child.stdout.on('data', data => logger.log(String(data).trim()))
  child.stderr.on('data', data => logger.error(data.trim()))
}

export const asyncExec = (cmd, showLog = true, showError = true) => new Promise((resolve, reject) => {
  let out = ''
  const child = exec(cmd)
  child.addListener('error', (code, signal) => reject(new Error(`fail with code ${code} & signal ${signal}`)))
  child.addListener('exit', code => resolve({ code, out }))
  child.stdout.on('data', data => {
    out += clean(data)
    if (showLog) logger.log(clean(data))
  })
  child.stderr.on('data', data => {
    out += clean(data)
    if (showError) logger.error(clean(data))
  })
})

export const untilUserStop = () => new Promise(() => {})

export const stackFolder = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

export const readJSON = file => readFile(file)
