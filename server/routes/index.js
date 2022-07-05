const {Router} = require('express')
const router = Router()
const userRouter = require('./userRouter')
const linksRouter = require('./linksRouter')

router.use('/link',linksRouter)
router.use('/user',userRouter)


module.exports = router