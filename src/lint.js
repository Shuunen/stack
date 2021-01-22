const { spawn } = require('child_process')
const { green, red } = require('colorette')

function lint() {
  const filepath = 'node_modules/xo/cli.js'
  const process = spawn('node', [filepath, '--fix'])
  process.stdout.on('data', data => console.log(red(data)))
  process.stderr.on('data', data => console.error(red(data)))
  process.on('close', code => console.log(code === 0 ? green('no lint issues detected') : red('lint issue(s) detected')))
}

exports.lint = lint
