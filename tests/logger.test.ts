import { strictEqual as equal } from 'assert'
import { logger } from '../src/logger'


describe('logger', function () {

  it('log simple string', function () {
    equal(logger.log('fantastic log'), undefined)
    equal(logger.error('gorgeous error'), undefined)
    equal(logger.success('unbelievable success'), undefined)
    equal(logger.debug('surprising debug invisible'), undefined)
    logger.debugEnabled = true
    equal(logger.debug('tremendous debug visible'), undefined)
    logger.debugEnabled = false
  })

  it('do not log empty string', function () {
    equal(logger.log(), undefined)
    equal(logger.error(''), undefined)
    equal(logger.success(' '), undefined)
  })

})
