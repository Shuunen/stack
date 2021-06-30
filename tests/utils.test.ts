import { ok, strictEqual as equal } from 'assert'
import { asyncExec, clean, execFile, nodeBin, readJSON } from '../src/utils'

describe('utils', function () {

  it('exec a non-existing file', function () {
    execFile('foo.js') // console error : file does not exists : foo.js
  })

  it('exec a failing file', function () {
    execFile('samples/log-error.js', '--foo') // console error : file does not exists : foo.js
  })

  it('async exec a command', async function () {
    const { code, out } = await asyncExec('pwd')
    ok(out.includes('/stack'))
    equal(code, 0) // zero for success
  })

  it('async exec a command without displaying output', async function () {
    const { code, out } = await asyncExec('ls', false)
    ok(out.includes('README.md'))
    equal(code, 0) // zero for success
  })

  it('async exec an error throwing file', async function () {
    const { code, out } = await asyncExec('node samples/throw-error.js', false, false)
    ok(out.includes('kind'))
    equal(code, 1) // one for error
  })

  it('async exec a failing command', async function () {
    const { code, out } = await asyncExec('plop')
    ok(out.includes('plop'))
    ok(code > 0) // sometime 1 on windows, sometimes 127 on linux
  })

  it('async exec a failing command without displaying output', async function () {
    const { code, out } = await asyncExec('plop', false, false)
    ok(out.includes('plop'))
    ok(code > 0) // sometime 1 on windows, sometimes 127 on linux
  })

  it('read a json file', async function () {
    const content = await readJSON<packageJson>('package.json')
    ok(content.name.includes('stack'))
  })

  it('init a nodeBin var', function () {
    ok(nodeBin.includes('.bin'))
  })

  it('clean some messy string', function () {
    equal(clean(`

    `).trim(), '')
  })

})
