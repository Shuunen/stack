const tsup = require('tsup').build

function build(options) {
  if (options === undefined || options.length === 0) throw new Error('can\'t build without input, ex: stack build src/my-file.ts')
  const input = options[0]
  options = options.join(' ')
  const outDir = (/--out-dir (\S*)/.exec(options) || [null, 'dist'])[1]
  const format = (/--format (\S*)/.exec(options) || [null, 'cjs'])[1]
  const minify = options.includes('--minify')
  const config = { outDir, minify, entryPoints: [input], format: [format] }
  tsup(config)
}

exports.build = build
