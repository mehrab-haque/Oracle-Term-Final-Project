const router = require('express').Router()
const authMiddleware=require('../service/tokenValidationService')

const UsersController=require('../controller/usersController')

const usersController=new UsersController()

router.get('/list',authMiddleware,usersController.getList)

module.exports = router;