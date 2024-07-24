const Brand = require("../model/Brands")

const brandController = {
    addBrand: async (req, res) => {
        try {
            const brandTest = await Brand.find()
            let id
            do {
                id = Math.floor(Math.random() * 100000000) + 1;
            } while (brandTest.includes(id))
            const brandID = `BR${id}`
            const brand = await new Brand({
                id: brandID,
                nameBrand: req.body.nameBrand,
                image: req.body.image
            })

            const newBrand = await brand.save()
            console.log("asd", newBrand)
            res.status(200)
            res.json({
                _id: newBrand.id,
                data: newBrand
            })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    getBrand: async (req, res) => {
        try {
            const brand = await Brand.findById(req.params.id)
            if (!brand) {
                return res.status(404).json({ message: "brand not found" })
            }
            res.status(200)
            res.json({ data: brand })
        }
        catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    getAllBrand: async (req, res) => {
        try {
            const brand = await Brand.find()
            res.status(200)
            res.json({ data: brand })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    updateBrand: async (req, res) => {
        try {
            const brand = await Brand.findByIdAndUpdate(req.params.id, req.bod, { new: true })
            if (!brand) {
                return res.status(404).json({ message: "brand not found" })
            }
            res.status(200)
            res.json({ data: brand })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    deleteBrand: async (req, res) => {
        try {
            const brand = await Brand.findByIdAndDelete(req.params.id)
            if (!brand) {
                return res.status(404).json({ message: "brand not found" })
            }
            res.status(200)
            res.json({ data: brand })
        }
        catch (err) {
            res.json(err)
            res.status(500)
        }
    }
}
module.exports = brandController