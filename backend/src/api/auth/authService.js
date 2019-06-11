const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../users/user')
const env = require('../../../.env')
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{6,12})/

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
}

const login = (req, res, next) => {
    const userName = req.body.userName || ''
    const password = req.body.password || ''
    User.findOne({ userName }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "1 day"
            })
            const { name, email, userName, age, leo, photo, _id } = user
            res.json({ name, email, userName, age, leo, token, changePassword, photo, _id })
        } else {
            return res.status(401).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

const signup = (req, res, next) => {
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''
    const userName = req.body.userName || ''
    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informado está inválido'] })
    }
    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$ %) e tamanho entre 6 - 12."
            ]
        })
    }
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }
    User.findOne({ userName }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {
            const newUser = new User({ name, email, password: passwordHash, userName, changePassword: true })
            newUser.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err)
                } 
                return res.status(200).send({ name, email, userName })
                // else {
                //     login(req, res, next)
                // }
            })
        }
    })
}

const changePassword = (req, res, next) => {

    const oldPassword = req.body.oldPassword || ''
    const password = req.body.newPassword || ''
    const confirmPassword = req.body.confirmPassword || ''
    const userName = req.body.userName || ''

    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$ %) e tamanho entre 6 - 12."
            ]
        })
    }
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }
    User.findOne({ userName }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (!bcrypt.compareSync(oldPassword, user.password)) {
            return res.status(400).send({ errors: ['Senha incorreta.'] })
        } else {
            user.password = passwordHash;
            user.changePassword = false;
            user.save()
                .then(success => res.status(200).json({ status: 200, message: 'Dados atualizados com sucesso' }))
                .catch(err => res.status(500).json({ status: 500, message: 'Ocorreu um erro na inserção dos dados', error: err }))
        }
    })
}

module.exports = { login, signup, changePassword, validateToken }