const mongoose = require('mongoose');

// Assuming Brand, ProductAttribute, and ProductVariation schemas are defined elsewhere
const BrandSchema = require('./Brands');
const CategorySchema = require('./Categories')
const ProductAttributeSchema = require('./ProductAttributes');
const ProductVariationSchema = require('./ProductVariations');

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    salePrice: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    brandId: {
        type: String
    },
    description: {
        type: String
    },
    categoryId: {
        type: String
    },
    slider: {
        type: Array
    },
    productType: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    sizeId:
    {
        type: String
    },
    // idProductVariations: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'ProductVariation'
    // }],
    sellNumber: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
