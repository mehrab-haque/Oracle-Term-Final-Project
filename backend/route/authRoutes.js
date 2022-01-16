const router = require('express').Router()
const authMiddleware=require('../service/tokenValidationService')
const adminAuthMiddleware=require('../service/adminTokenValidationService')

const AuthController=require('../controller/authController')

const authController=new AuthController()

//anyone can register and login
router.post('/reg',authController.reg)
router.post('/login',authController.login)

//only a user can change his/her own password
router.post('/change_password',authMiddleware,authController.changePassword)

//only admin user can see the list of users and delete one
router.get('/list',adminAuthMiddleware,authController.getList)
router.delete('/delete/:id',adminAuthMiddleware,authController.delete)

module.exports = router;