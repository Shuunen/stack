import { green, red } from 'colorette'

const nothing = (stuff: unknown[] = []) => {
  if (stuff.length === 0) return true
  if (stuff.length === 1 && (typeof stuff[0] === 'string' && stuff[0].trim().length === 0)) return true
  return false
}

class Logger {
  consoleLogAllowed = false
  debugEnabled = false

  constructor() {
    console.log = this.consoleLogProxy.bind(this) // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  }

  log(...stuff: unknown[]) {
    if (nothing(stuff)) return
    console.info(...stuff, '')
  }

  error(...stuff: unknown[]) {
    if (nothing(stuff)) return
    console.error(...stuff.map(thing => red(String(thing))), '')
  }

  success(...stuff: unknown[]) {
    if (nothing(stuff)) return
    console.info(...stuff.map(thing => green(String(thing))), '')
  }

  consoleLogProxy(...stuff: unknown[]) {
    if (this.consoleLogAllowed) this.log(...stuff)
  }

  debug(...stuff: unknown[]) {
    if (this.debugEnabled) this.log(...stuff)
  }
}

export const logger = new Logger()
