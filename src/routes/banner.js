const router = require('express').Router()
const bannerController = require("../controller/bannerController")
const middlewareController = require('../controller/middlewareController')

router.post("/addBanner", middlewareController.verifyTokenAdmin, bannerController.addBanner)
router.delete('/deleteBanner/:id', middlewareController.verifyTokenAdmin, bannerController.deleteBanner)
router.put('/updateBanner/:id', middlewareController.verifyTokenAdmin, bannerController.updateBanner)
router.get('/getBanner/:id', bannerController.getBanner)
router.get('/getAllBanner/', bannerController.getAllBanner)

module.exports = router