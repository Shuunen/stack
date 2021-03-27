const { logger } = require('./logger')
const { untilUserStop } = require('./utils')
const openBrowser = require('servor/utils/openBrowser')
const servor = require('servor/servor')

async function serve(folder) {
  const { url } = await servor({ root: folder, reload: true })
  logger.log(`server is up : ${url}`)
  openBrowser(url)
  await untilUserStop()
}

exports.serve = serve
