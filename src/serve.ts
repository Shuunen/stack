import servor from 'servor/servor'
import openBrowser from 'servor/utils/openBrowser'
import { logger } from './logger'
import { untilUserStop } from './utils'

export const serve = async (folder: string): Promise<void> => {
  /* eslint-disable @typescript-eslint/no-unsafe-call */
  const { url } = (await servor({ root: folder, reload: true })) as { url: string }
  logger.log(`server is up : ${url}`)
  openBrowser(url)
  /* eslint-enable @typescript-eslint/no-unsafe-call */
  await untilUserStop()
}

