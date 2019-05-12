const restful = require('node-restful')
const mongoose = restful.mongoose


const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    body: { type: String, required: true },
    detail: { type: [String], required: true },
    photo: { type: [String], required: true },
})

module.exports = restful.model('News', newsSchema)