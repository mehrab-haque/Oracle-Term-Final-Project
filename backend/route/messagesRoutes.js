const router = require('express').Router()
const authMiddleware=require('../service/tokenValidationService')
const adminAuthMiddleware=require('../service/adminTokenValidationService')

const MessagesController=require('../controller/messagesController')

const messagesController=new MessagesController()

//anyone can see the list off items
router.post('/send',authMiddleware,messagesController.send)


module.exports = router;
