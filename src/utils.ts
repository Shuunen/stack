import { exec, spawn } from 'child_process'
import { existsSync } from 'fs'
import jsonfile from 'jsonfile'
import path from 'path'
import { logger } from './logger'

const { readFile } = jsonfile

export const join = path.join

const clean = (output: string) => output.replace(/\n$/, '')

export const execFile = (...args: string[]): void => {
  const exists = existsSync(args[0])
  if (!exists) return logger.error('file does not exists :', args[0])
  const child = spawn('node', args)
  child.stdout.on('data', data => logger.log(String(data).trim()))
  child.stderr.on('data', data => logger.error(String(data).trim()))
}

export const asyncExec = async (cmd: string, showLog = true, showError = true): Promise<{ code: number, out: string }> => new Promise((resolve, reject) => {
  let out = ''
  logger.debug('executing :', cmd)
  const child = exec(cmd)
  child.addListener('error', (code: number, signal: number) => reject(new Error(`fail with code ${code} & signal ${signal}`)))
  child.addListener('exit', (code: number) => {
    logger.debug('exec ended with :', { code, out })
    return resolve({ code, out })
  })
  child.stdout?.on('data', data => {
    const cleanString = clean(String(data))
    out += cleanString
    if (showLog) logger.log(cleanString)
  })
  child.stderr?.on('data', data => {
    const cleanString = clean(String(data))
    out += cleanString
    if (showError) logger.error(cleanString)
  })
})

export const untilUserStop = async (): Promise<void> => new Promise(() => { console.log('ninja') })

export const stackFolder = join(__dirname, '..') // eslint-disable-line unicorn/prefer-module

export const stackBin = join(stackFolder, 'node_modules/.bin')

export const readJSON = async <T> (file: string): Promise<T> => readFile(file) // eslint-disable-line @typescript-eslint/no-unsafe-return
