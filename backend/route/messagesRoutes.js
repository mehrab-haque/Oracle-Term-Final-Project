const router = require('express').Router()
const authMiddleware=require('../service/tokenValidationService')
const adminAuthMiddleware=require('../service/adminTokenValidationService')

const MessagesController=require('../controller/messagesController')

const messagesController=new MessagesController()

//anyone can see the list off items
router.post('/send',authMiddleware,messagesController.send)
router.get('/get/:id',authMiddleware,messagesController.get)
router.post('/delete',authMiddleware,messagesController.delete)
router.get('/group/get/:id',authMiddleware,messagesController.getGroup)

router.get('/replies/get/:id',authMiddleware,messagesController.getReplies)
router.get('/group/get/deletedMessages/:id',authMiddleware,messagesController.getDeletedMessages)

module.exports = router;
