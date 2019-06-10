const express = require('express')
const restful = require('node-restful')
const auth = require('../api/auth/auth')
const mongoose = restful.mongoose

module.exports = function (server) {

    /*
    * JWT Token protected routes
    */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    const multer = require('multer')

    protectedApi.use(auth)

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
    const upload = multer({ storage: storage })

    // Members insertion in the database (POST)
    protectedApi.post('/Members', upload.single('member'), (req, res, next) => {
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

    // Projects insertion in the database (POST)
    protectedApi.post('/Projects', upload.single('project'), (req, res, next) => {
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

    // News insertion in the database (POST)
    protectedApi.post('/News', upload.array('news', 12), (req, res, next) => {
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

     // User update in the database (POST)
     //REMOVER USER ROUTES
     const User = require('../api/users/userService')
     protectedApi.post('/User', upload.single('user'), (req, res, next) => {
         User.findOne({ _id: req.body._id }, function (err, doc){
             doc.name = req.body.name;
             doc.age = req.body.age || null;
             doc.leo = req.body.leo || null;
             doc.email = req.body.email;
             doc.photo = req.file ? req.file.path : null;
             doc.save()
                .then(success => res.status(200).json({ status: 200, message: 'Dados atualizados com sucesso' }))
                .catch(err => res.status(500).json({ status: 500, message: 'Ocorreu um erro na inserção dos dados', error: err }))
        });
    })
    protectedApi.post('/User', upload.single('user'), (req, res, next) => {
        User.findOne({ _id: req.body._id }, function (err, doc) {
            doc.name = req.body.name;
            doc.age = req.body.age || null;
            doc.leo = req.body.leo || null;
            doc.email = req.body.email;
            doc.photo = req.file ? req.file.path : null;
            doc.save()
                .then(success => res.status(200).json({ status: 200, message: 'Dados atualizados com sucesso' }))
                .catch(err => res.status(500).json({ status: 500, message: 'Ocorreu um erro na inserção dos dados', error: err }))
        });
    })
        
    User.register(protectedApi, '/User')
    // Members Routes
    const Members = require('../api/members/membersService')
    Members.register(protectedApi, '/Members')
    // Projects Routes
    const Projects = require('../api/projects/projectsService')
    Projects.register(protectedApi, '/Projects')
    // News Routes
    const News = require('../api/news/newsService')
    News.register(protectedApi, '/News')


    /*
    * Open routes
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)
    const AuthService = require('../api/auth/AuthService')
    openApi.post('/login', AuthService.login)
    protectedApi.post('/signup', AuthService.signup)
    protectedApi.post('/password', AuthService.changePassword)
    openApi.post('/validateToken', AuthService.validateToken)
}