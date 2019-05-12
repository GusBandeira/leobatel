const News = require('./news')
const errorHandler = require('../common/errorHandler')


News.methods(['get', 'post', 'put', 'delete'])
News.updateOptions({ new: true, runValidators: true })
News.after('post', errorHandler).after('put', errorHandler)

module.exports = News