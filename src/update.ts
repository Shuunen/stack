import { blueBright, green } from 'colorette'
import { writeFileSync } from 'fs'
import { logger } from './logger'
import { asyncExec, join, readJSON } from './utils'

export async function update (): Promise<void> {
  const result = await asyncExec('npm outdated', false, false)
  if (result.out.length === 0) return logger.success('all deps seems up to date :)')
  const toUpdate = {}
  result.out.split('\n').forEach(line => {
    const [, name = '', version = ''] = line.match(/([\w-]+).*(\d+.\d+.\d+)\s/) ?? []
    if (name) toUpdate[name] = version
  })
  const pkg = await readJSON<packageJson>(join(process.cwd(), 'package.json'))
  for (const name in pkg.devDependencies) pkg.devDependencies[name] = toUpdate[name] ?? pkg.devDependencies[name]
  for (const name in pkg.dependencies) pkg.dependencies[name] = toUpdate[name] ?? pkg.dependencies[name]
  writeFileSync('package.json', JSON.stringify(pkg, undefined, 2))
  logger.log(`${green(Object.keys(toUpdate).length + ' dep(s) updated')}, review your ${blueBright('package.json')} & run ${green('npm install')} if you're ok with it :D`)
}
