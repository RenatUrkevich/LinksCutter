const {Router} = require('express')
const router = Router()

const auth = require('../middleware/auth.middleware')

const LinksController = require('../contollers/LiinksController')


router.post('/generate',auth,LinksController.generate )

router.get('/',auth,LinksController.getAll )


router.get('/:id',auth,LinksController.getById )



module.exports = router