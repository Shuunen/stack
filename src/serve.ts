import servor from 'servor/servor'
import openBrowser from 'servor/utils/openBrowser'
import { logger } from './logger'
import { untilUserStop } from './utils'

/* istanbul ignore next */
export const serve = async (folder: string): Promise<void> => {
  const { url } = (await servor({ root: folder, reload: true })) as { url: string }
  logger.log(`server is up : ${url}`)
  openBrowser(url)
  await untilUserStop()
}

