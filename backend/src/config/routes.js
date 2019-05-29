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
            .then(success => res.status(200).json({ status: 200, message: 'Membro adicionado com sucesso' }))
            .catch(err => res.status(500).json({ status: 500, message: 'Ocorreu um erro na inserção do Membro', error: err }))
    })
    router.post('/Projects', upload.single('project'), (req, res, next) => {
        const project = new Projects({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            photo: req.file.path
        })
        project.save()
            .then(success => res.status(200).json({ status: 200, message: 'Projeto adicionado com sucesso' }))
            .catch(err => res.status(500).json({ status: 500, message: 'Ocorreu um erro na inserção do Projeto', error: err }))
    })
    router.post('/News', upload.array('news', 12), (req, res, next) => {
        const paths = req.files.map(file => file.path)
        const news = new News({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            subtitle: req.body.subtitle,
            body: req.body.body,
            photo: paths,
            detail: req.body.detail,
            author: req.body.author,
            date: req.body.date
        })
        news.save()
            .then(success => res.status(200).json({ status: 200, message: 'Notícia adicionada com sucesso' }))
            .catch(err => res.status(500).json({ status: 500, message: 'Ocorreu um erro na inserção da Notícia', error: err }))
    })

    // Rotas de Membros
    const Members = require('../api/members/membersService')
    Members.register(router, '/Members')
    // Rotas de Projetos
    const Projects = require('../api/projects/projectsService')
    Projects.register(router, '/Projects')
    // Rotas de Notícias
    const News = require('../api/news/newsService')
    News.register(router, '/News')

}