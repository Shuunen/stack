import { build as esbuild } from 'esbuild'
import { writeFileSync } from 'jsonfile'
import pkg from '../package.json'

const makeAllPackagesExternalPlugin = {
  name: 'make-all-packages-external',
  setup (build) {
    const filter = /^[^./]|^\.[^./]|^\.\.[^/]/ // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, args => ({ path: args.path, external: true }))
  },
}

const build = async () => {
  const status = await esbuild({
    bundle: true,
    entryPoints: ['src/cli.ts'],
    metafile: true,
    minify: true,
    outfile: pkg.main,
    platform: 'node',
    plugins: [makeAllPackagesExternalPlugin],
    target: 'node14',
  })
  if (status.errors.length > 0) {
    console.error(status.errors)
    process.exit(1)
  }
  if (status.warnings.length > 0) return console.log('\ncompilation ended with warnings :', status.warnings)
  console.log('\ncompilation ended successfully')
  if (status.metafile) writeFileSync('meta.json', status.metafile)
}

build()
