import { lstat } from 'fs/promises'
import { build } from './build'
import { logger } from './logger'
import { serve } from './serve'

export async function dev (args: string[]): Promise<void> {
  const input = args[0]
  if (!input) return build(['--dev']).catch(error => logger.error(error))
  const stat = await lstat(input)
  if (stat.isDirectory()) return serve(input)
  if (stat.isFile()) build([input, '--watch --run']).catch(error => logger.error(error))
  throw new Error('un-handled dev case')
}
