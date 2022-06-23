const {Router} = require('express')
const router = Router()
const {check} = require('express-validator')
const UserController = require('../contollers/UserController')

router.post('/registration',[
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })],
UserController.registration)

router.post('/login',[
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()],
UserController.login)

module.exports = router 