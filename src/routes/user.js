const middlewareController = require("../controller/middlewareController")
const userController = require("../controller/userController")
const router = require('express').Router()

router.get("/", userController.getAllUser)
router.get("/customer", userController.getAllCus)
router.delete("/:id", middlewareController.verifyTokenAdmin, userController.deleteUser)
router.get('/:id', userController.getUser)
router.put("/:id", middlewareController.verifyToken, userController.updateUser)
router.post("/changePass", middlewareController.verifyToken, userController.changePassword)
module.exports = router