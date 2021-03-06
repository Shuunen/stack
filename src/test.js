const { execFile } = require('./utils')

async function test(options = []) {
  const bin = `${process.cwd()}/node_modules/mocha/bin/mocha`
  options.unshift(bin)
  execFile(...options)
}

exports.test = test
