'use strict'

const { withTimeoutOption } = require('../../utils')

module.exports = ({ multiaddrs }) => {
  return withTimeoutOption(async function localAddrs () { 
    return multiaddrs
  })
}
