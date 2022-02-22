const router = require('express').Router()
const authMiddleware=require('../service/tokenValidationService')
const adminAuthMiddleware=require('../service/adminTokenValidationService')

const MessagesController=require('../controller/messagesController')

const messagesController=new MessagesController()

//anyone can see the list off items
router.post('/send',authMiddleware,messagesController.send)
router.get('/get/:id',authMiddleware,messagesController.get)
router.get('/group/get/:id',authMiddleware,messagesController.getGroup)
router.get('/replies/get/:id',authMiddleware,messagesController.getReplies)

module.exports = router;
