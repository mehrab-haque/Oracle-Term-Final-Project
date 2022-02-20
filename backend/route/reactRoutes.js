const router = require('express').Router()
const authMiddleware=require('../service/tokenValidationService')
const adminAuthMiddleware=require('../service/adminTokenValidationService')

const ReactController=require('../controller/reactController')

const reactController=new ReactController()


router.get('/list',authMiddleware,reactController.getList)

router.post('/create',authMiddleware,reactController.createReact)
module.exports = router;