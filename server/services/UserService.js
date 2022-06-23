const {User} = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('config')

class UserService{
    async registration(email,password){
        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message:'Такой пользователь уже существует'})
        }

        const hashedpassword = await bcrypt.hash(password,12)
        const user = new User({email, password: hashedpassword})
        return user 
    }

    async login(email,password){
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'Такой пользователь не существует'})
        }
        const equalpass = bcrypt.compareSync(password, user.password)
        if(!equalpass){
            throw ApiErorr.BadReqest('неверный пароль')
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )
        
        return({token,userId: user.id})
    }
}

module.exports = new UserService()