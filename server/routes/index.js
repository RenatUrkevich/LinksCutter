const {Router} = require('express')
const router = Router()
const userRouter = require('./userRouter')

router.use('/user',userRouter)

module.exports = router