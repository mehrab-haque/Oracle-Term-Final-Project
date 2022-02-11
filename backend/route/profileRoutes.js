const router = require('express').Router()
const authMiddleware=require('../service/tokenValidationService')
const adminAuthMiddleware=require('../service/adminTokenValidationService')

const ProfileController=require('../controller/profileController')

const profileController=new ProfileController()

//anyone can see the list off items
router.get('/profile',authMiddleware,profileController.getProfile)
router.put('/profile',authMiddleware,profileController.setProfile)


module.exports = router;
