const restful = require('node-restful')
const mongoose = restful.mongoose



const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
})

module.exports = restful.model('Message', messageSchema)