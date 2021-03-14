const servor = require('servor/servor')
const { logger } = require('./logger')
const openBrowser = require('servor/utils/openBrowser')

async function serve(folder) {
  const { url } = await servor({ root: folder, reload: true })
  logger.log(`server is up : ${url}`)
  openBrowser(url)
}

exports.serve = serve
