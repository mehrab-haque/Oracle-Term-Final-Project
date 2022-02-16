const router = require('express').Router()
const authMiddleware=require('../service/tokenValidationService')

const GroupController=require('../controller/groupController')

const groupController=new GroupController()

router.post('/create',authMiddleware,groupController.createGroup)
router.post('/add',authMiddleware,groupController.addMember)
router.get('/getMembers/:id',authMiddleware,groupController.getGroupMembers)
router.post('/remove',authMiddleware,groupController.removeMember)
module.exports = router;
