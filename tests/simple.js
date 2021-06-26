// eslint-disable-next-line @typescript-eslint/no-var-requires
const color = require('colorette')

const Person = class {
  constructor () {
    this.name = color.bgBlackBright(' Pam Beesly <3 ')
  }
  hi () {
    console.log(`Hey my name is ${this.name || 'Jim Halpert'} !`)
  }
}

const pam = new Person()
pam.hi()
