import { exec, spawn } from 'child_process'
import { Message } from 'esbuild'
import { existsSync } from 'fs'
import { readFile } from 'jsonfile'
import path from 'path'
import { logger } from './logger'

export const join = path.join

export const clean = (output: string): string => output.replace(/\n$/, '')

export const execFile = (...args: string[]): void => {
  const exists = existsSync(args[0])
  if (!exists) return logger.error('file does not exists :', args[0])
  const child = spawn('node', args)
  child.stdout.on('data', /* istanbul ignore next */ data => logger.log(String(data).trim()))
  child.stderr.on('data', /* istanbul ignore next */ data => logger.error(String(data).trim()))
}

export const asyncExec = async (cmd: string, showLog = true, showError = true): Promise<{ code: number, out: string }> => new Promise((resolve, reject) => {
  let out = ''
  logger.debug('executing :', cmd)
  const child = exec(cmd)
  child.addListener('error', /* istanbul ignore next */(code: number, signal: number) => reject(new Error(`fail with code ${code} & signal ${signal}`)))
  child.addListener('exit', (code: number) => {
    logger.debug('exec ended with :', { code, out })
    return resolve({ code, out })
  })
  child.stdout.on('data', data => {
    const cleanString = clean(String(data))
    out += cleanString
    if (showLog) logger.log(cleanString)
  })
  child.stderr.on('data', data => {
    const cleanString = clean(String(data))
    out += cleanString
    if (showError) logger.error(cleanString)
  })
})

/* istanbul ignore next */
export const untilUserStop = async (): Promise<void> => new Promise(() => { console.log('Press Ctrl+C to stop...\n') })

export const stackFolder = join(__dirname, '..')

export const nodeBin = join(process.cwd(), 'node_modules/.bin')

export const readJSON = async <T> (filepath: string): Promise<T> => readFile(filepath)

/* istanbul ignore next */
export const exitWithError = (error: Error | string | Message[]): void => {
  logger.error(error)
  process.exit(1)
}
