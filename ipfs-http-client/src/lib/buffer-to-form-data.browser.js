'use strict'


module.exports = buf => {
  const formData = new FormData()
  formData.append('file', new Blob([buf], { type: 'application/octet-stream' }))
  return formData
}
