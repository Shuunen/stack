import servor from 'servor/servor.js'
import openBrowser from 'servor/utils/openBrowser.js'
import { logger } from './logger.js'
import { untilUserStop } from './utils.js'

export const serve = async folder => {
  const { url } = await servor({ root: folder, reload: true })
  logger.log(`server is up : ${url}`)
  openBrowser(url)
  await untilUserStop()
}

