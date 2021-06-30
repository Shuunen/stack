
import { ok, rejects } from 'assert'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { build } from '../src/build'

describe('build', function () {

  let content = ''

  it('build a node js file', async function () {
    await build(['samples/node.js', '--platform node'])
    ok(existsSync('dist/node.js'))
  })

  it('build a node ts file', async function () {
    await build(['samples/node.ts', '--platform node --quiet'])
    content = await readFile('dist/node.js', 'utf-8')
    ok(content.includes('Jim Halpert')) // from the ts
    ok(content.includes('[22m')) // color special char from colorette
  })

  it('build a node ts file with meta export enabled', async function () {
    await build(['samples/node.ts', '--meta --quiet'])
    content = await readFile('meta.json', 'utf-8')
    ok(content.includes('public/node.js')) // verify it's the correct meta file ^^
    ok(content.includes('node_modules/colorette'))

  })

  it('build a node ts file and run it', async function () {
    await build(['samples/node.ts', '--run --out-dir dist --format iife --quiet'])
    content = await readFile('dist/node.js', 'utf-8')
    ok(content.includes('(()=>')) // iife
  })

  it('build default file location fail', async function () {
    await rejects(build(['--quiet'])) // Could not resolve "src/index.ts"
  })

  it('build a web ts file', async function () {
    await build(['samples/web.ts', '--quiet'])
    content = await readFile('public/web.js', 'utf-8')
    ok(content.includes('addEventListener')) // from the shuutils on('load')
    ok(content.includes('text-center')) // dynamic class
    content = await readFile('public/web.css', 'utf-8') // ts file import css so esbuild + postcss + tailwind will build it
    ok(content.includes('text-center')) // tailwind class not purge because found in the dynamic class above
    ok(content.includes('border-box;')) // tailwind reset
  })

  it('try to build a problematic ts file', async function () {
    await rejects(build(['samples/build-error.ts','--quiet'])) // Could not resolve "non-installed-dep"
  })

  it('try to build a problematic js file', async function () {
    await rejects(build(['samples/build-error.js','--quiet'])) // Could not resolve "non-installed-dep"
  })

})
