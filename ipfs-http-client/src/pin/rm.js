'use strict'

const rmAll = require('./rm-all')
const last = require('it-last')
const configure = require('../lib/configure')

module.exports = (options) => {
  const all = rmAll(options)

  return configure(() => {
    return async function rm (path, options = {}) { 
      return last(all({
        path,
        ...options
      }, options))
    }
  })(options)
}
