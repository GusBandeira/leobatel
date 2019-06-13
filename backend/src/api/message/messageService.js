const Message = require('./message')
const errorHandler = require('../common/errorHandler')


Message.methods(['get', 'post', 'put', 'delete'])
Message.updateOptions({ new: true, runValidators: true })
Message.after('post', errorHandler).after('put', errorHandler)

module.exports = Message