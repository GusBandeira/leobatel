const restful = require('node-restful')
const mongoose = restful.mongoose



const projectsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true }
})

module.exports = restful.model('Projects', projectsSchema)