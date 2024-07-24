const router = require("express").Router()
const categoryController = require("../controller/categoryController")
const middlewareController = require("../controller/middlewareController")
router.post("/addCategory", middlewareController.verifyTokenAdmin, categoryController.addCategory)
router.delete('/deleteCategory/:id', middlewareController.verifyTokenAdmin, categoryController.deleteCategory)
router.put('/updateCategory/:id', middlewareController.verifyTokenAdmin, categoryController.updateCategory)
router.get('/getCategory/:id', categoryController.getCategory)
router.get('/getAllCategory/', categoryController.getAllCategory)
module.exports = router