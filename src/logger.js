const { red, green } = require('colorette')

class Logger {
  constructor() {
    this.log('in logger constructor')
    this.consoleLogAllowed = false
    console.log = this.consoleLogProxy.bind(this)
  }

  log(...stuff) {
    console.info(...stuff, '')
  }

  error(...stuff) {
    console.error(...stuff.map(thing => red(thing)), '')
  }

  success(...stuff) {
    console.info(...stuff.map(thing => green(thing)), '')
  }

  consoleLogProxy(...stuff) {
    if (this.consoleLogAllowed) this.log(...stuff)
  }
}

exports.logger = new Logger()
