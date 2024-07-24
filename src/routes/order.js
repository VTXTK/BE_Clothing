const orderController = require('../controller/orderController')
const middlewareController = require("../controller/middlewareController")
const router = require('express').Router()
router.post("/", middlewareController.verifyToken, orderController.createOrder)
router.get("/all", middlewareController.verifyToken, orderController.getAllOrder)
router.delete("/:id", middlewareController.verifyToken, orderController.deleteOrder)
router.get("/:id", middlewareController.verifyToken, orderController.getDetailOrder)
router.put("/:id", middlewareController.verifyToken, orderController.updateOrder)
router.get("/:id", middlewareController.verifyToken, orderController.getDetailOrder)
module.exports = router