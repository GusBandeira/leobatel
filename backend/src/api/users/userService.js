const User = require('./user')
const errorHandler = require('../common/errorHandler')


User.methods(['get', 'delete'])
User.updateOptions({ new: true, runValidators: true })

module.exports = User