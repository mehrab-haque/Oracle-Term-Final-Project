const router = require('express').Router()
const authMiddleware=require('../service/tokenValidationService')
const adminAuthMiddleware=require('../service/adminTokenValidationService')

const ItemsController=require('../controller/itemssController')

const itemsController=new ItemsController()

//anyone can see the list off items
router.get('/list',itemsController.getList)
//only an admin can create item(s)
router.post('/create',adminAuthMiddleware,itemsController.create)
//an authenticated user can update an item
router.put('/update/:id',authMiddleware,itemsController.update)
//only admins can delete items
router.delete('/delete/:id',adminAuthMiddleware,itemsController.delete)

module.exports = router;