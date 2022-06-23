const {validationResult } = require('express-validator')
const UserService = require('../services/UserService')

class UserController {
    async registration(req,res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректнные данные при регистрации'
                })
            }
            const {email,password} = req.body
            const userData = await UserService.registration(email,password)
            await userData.save()

            res.status(201).json({message: 'Пользователь создан'})
        }catch(e){
            res.starus(500).json({message: "Что-то пошло не так"})
        }

    }

    async login(req,res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректнные данные при авторизации'
                })
            }
            const {email,password} = req.body
            const userData = await UserService.login(email,password)
            res.json(userData)
        }catch(e){
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
}

module.exports = new UserController()