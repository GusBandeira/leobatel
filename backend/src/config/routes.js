const express = require('express')
const restful = require('node-restful')
const mongoose = restful.mongoose

module.exports = function(server) {
    
    // Definir URL base para todas as rotas 
    const router = express.Router()
    server.use('/api', router)
    const multer = require('multer')
    
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname)
        }
    })
    const upload = multer({ storage: storage })
    
    router.post('/Members', upload.single('member'), (req, res, next) => {
        const member = new Members({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            photo: req.file.path
        })
        member.save()
            .then(success => res.status(200).json({ message: 'Success' }))
            .catch(err => res.status(500).json({ error: err }))
    })

    // Rotas de Ciclo de Pagamento 
    const Members = require('../api/members/membersService')
    Members.register(router, '/Members')

}