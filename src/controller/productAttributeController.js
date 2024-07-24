
const ProductAttribute = require("../model/ProductAttributes")
const productAttributeController = {
    addProductAttribute: async (req, res) => {
        try {
            const productTest = await ProductAttribute.find()
            let id
            do {
                id = Math.floor(Math.random() * 100000000) + 1;
            } while (productTest.includes(id))
            const productId = `ATT${id}`
            const newProductAttribute = await new ProductAttribute({
                id: productId,
                nameAttribute: req.body.nameAttribute,
                value: req.body.value
            })
            const productAttribute = await newProductAttribute.save()
            res.status.json({
                data: {
                    _id: productAttribute.id,
                    productAttribute: productAttribute
                }
            })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    getProductAttribute: async (req, res) => {
        try {
            const productAttribute = await ProductAttribute.find(req.params.id)
            if (!productAttribute) {
                return res.status(404).json({ message: 'ProductAttribute not found' });
            }
            res.status(200)
            return res.json({ data: productAttribute })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    getAllProductAttribute: async (req, res) => {
        try {
            const productAttributes = await ProductAttribute.find()
            if (!productAttributes) {
                return res.status(404).json({ message: 'ProductAttribute not found' });
            }
            res.status(200)
            return res.json({ data: productAttributes })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    updateProductAttribute: async (req, res) => {
        try {
            const product = await ProductAttribute.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return res.json({ data: product })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    deleteProductAttribute: async (req, res) => {
        try {
            const product = await ProductAttribute.findByIdAndDelete(req.params.id)
            if (!product) {
                return res.status(404).json({ message: 'ProductAttribute not found' });
            }
            res.json({ data: product });
        } catch (error) {
            return res.status(500).json(error)
        }
    },

}
module.exports = productAttributeController