const Projects = require('./projects')
const errorHandler = require('../common/errorHandler')


Projects.methods(['get', 'post', 'put', 'delete'])
Projects.updateOptions({ new: true, runValidators: true })
Projects.after('post', errorHandler).after('put', errorHandler)

module.exports = Projects