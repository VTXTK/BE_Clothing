const router = require('express').Router()
const brandController = require("../controller/brandController")
const middlewareController = require('../controller/middlewareController')

router.post("/addBrand", middlewareController.verifyTokenAdmin, brandController.addBrand)
router.delete('/deleteBrand/:id', middlewareController.verifyTokenAdmin, brandController.deleteBrand)
router.put('/updateCategory/:id', middlewareController.verifyTokenAdmin, brandController.updateBrand)
router.get('/getBrand/:id', brandController.getBrand)
router.get('/getAllBrand/', brandController.getAllBrand)
module.exports = router