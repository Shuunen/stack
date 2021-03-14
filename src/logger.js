const { red, green } = require('colorette')

const nothing = (stuff = []) => {
  if (stuff.length === 0) return true
  if (stuff.length === 1 && (typeof stuff[0] === 'string' && stuff[0].trim().length === 0)) return true
  return false
}

class Logger {
  constructor() {
    this.log('in logger constructor')
    this.consoleLogAllowed = false
    console.log = this.consoleLogProxy.bind(this)
  }

  log(...stuff) {
    if (nothing(stuff)) return
    console.info(...stuff, '')
  }

  error(...stuff) {
    if (nothing(stuff)) return
    console.error(...stuff.map(thing => red(thing)), '')
  }

  success(...stuff) {
    if (nothing(stuff)) return
    console.info(...stuff.map(thing => green(thing)), '')
  }

  consoleLogProxy(...stuff) {
    if (this.consoleLogAllowed) this.log(...stuff)
  }
}

exports.logger = new Logger()
