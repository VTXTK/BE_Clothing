const ProductVariation = require("../model/ProductVariations")
const productVariationController = {
    addProductVariation: async (req, res) => {
        try {
            const productTest = await ProductVariation.find()
            let id
            do {
                id = Math.floor(Math.random() * 100000000) + 1;
            } while (productTest.includes(id))
            const productId = `VT${id}`
            const productVariation = await new ProductVariation({
                id: productId,
                idProduct: req.body.idProduct,
                image: req.body.image,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                attributeValues: req.body.attributeValues,
                sellNumber: req.body.sellNumber,
                color: req.body.color || "",

            })
            const newProductVariation = await productVariation.save()
            res.status.json({
                data: {
                    _id: newProductVariation.id,
                    productVariation: newProductVariation
                }
            })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    getProductVariations: async (req, res) => {
        try {
            const productVariations = await ProductVariation.find(req.params.id)
            if (!productVariations) {
                return res.status(404).json({ message: 'ProductVariation not found' })
            }
            res.status(200)
            res.json({
                data: productVariations
            })
        }
        catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    updateProductVariations: async (req, res) => {
        try {
            const productVariations = await ProductVariation.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return res.json({ data: productVariations })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    deleteProductVariation: async (req, res) => {
        try {
            const productVariation = await ProductVariation.findByIdAndRemove(req.params.id)
            if (!productVariation) {
                return res.status(404).json({ message: 'ProductVariation not found' });
            }
            res.json({ data: productVariation });
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    }
}
module.exports = productVariationController