const mongoose = require('mongoose');

const productVariationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    idProduct: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
    },
    stock: {
        type: Number,
        required: true
    },
    color: {
        type: String,
    },
    attributeValues: {
        type: Map,
        of: String,
        required: true
    },
    sellNumber: {
        type: Number,
        default: 0
    }
});

const ProductVariation = mongoose.model('ProductVariation', productVariationSchema);

module.exports = ProductVariation;
