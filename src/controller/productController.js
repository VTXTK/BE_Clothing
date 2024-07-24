
const Product = require("../model/Products")
const apiQueryParams = require('api-query-params');
const productController = {
    addProduct: async (req, res) => {
        try {
            const productTest = await Product.find()
            let id
            do {
                id = Math.floor(Math.random() * 100000000) + 1;
            } while (productTest.includes(id))
            const productId = `SP${id}`
            const newProduct = await new Product({
                id: productId,
                price: req.body.price,
                title: req.body.title,
                stock: req.body.stock,
                thumbnail: req.body.thumbnail,
                brandId: req.body.brandId,
                description: req.body.description,
                categoryId: req.body.categoryId,
                slider: req.body.slider,
                productType: req.body.productType,
                color: req.body.color || "",
                sizeId: req.body.sizeId | ""
            })

            const products = await newProduct.save()
            res.status(200).json({
                data: {
                    _id: products.id,
                    products: products
                }
            })
        } catch (err) {
            res.json(err)
            res.status(500)
        }
    },
    detailProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200)
            return res.json({ data: product })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return res.json({ data: product })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ data: { product: product } });
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const params = apiQueryParams(req.query);
            const filter = {};
            if (params.filter.brandId) {
                filter.brandId = params.filter.brandId;
            }
            if (params.filter._id) {
                filter._id = params.filter._id;
            }
            if (params.filter.categoryId) {
                filter.categoryId = params.filter.categoryId;
            }
            // if (params.filter.price) {
            //     filter.price = {
            //         $gte: Number(params.filter.price.$gte),
            //         $lte: Number(params.filter.price.$lte)
            //     }
            // }
            if (params.filter.title) {
                filter.title = { $regex: params.filter.title, $options: 'i' }
            }
            const sort = params.sort || '-createdAt';
            const current = parseInt(params.filter.current);
            const pageSize = parseInt(params.filter.pageSize);
            const product = await Product.find(filter)
                .sort(sort)
                .skip(pageSize * (current - 1))
                .limit(pageSize)
                .exec();
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            const total = await Product.countDocuments(filter);
            const pages = Math.ceil(total / pageSize);
            const meta = {
                current: params.filter.current,
                pageSize: params.filter.pageSize,
                pages: pages,
                total: total
            }
            res.json({
                data: { product: product, meta: meta }
            });

        } catch (error) {
            res.status(500).json(error);
            console.log(err)
        }
    }


}

module.exports = productController