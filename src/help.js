const { red } = require('colorette')

function help(intent) {
  if (intent !== 'help') console.error(red(`intent not handled : ${intent}\n`))
  console.log(`Here is how to use stack :\n
  stack build src/my-file.ts
  stack build src/my-file.ts --out-dir public/dist --format iife --minify

  stack help
  `)
}

exports.help = help
