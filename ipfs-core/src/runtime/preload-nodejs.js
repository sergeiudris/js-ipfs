'use strict'

const HTTP = require('ipfs-utils/src/http')
const debug = require('debug')

const log = Object.assign(debug('ipfs:preload'), {
  error: debug('ipfs:preload:error')
})

module.exports = async function preload (url, options = {}) {
  log(url)

  const res = await HTTP.post(url, { signal: options.signal })

  for await (const _ of res.body) { 
    // Read to completion but do not cache
  }
}
