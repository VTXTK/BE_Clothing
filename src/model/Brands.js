const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nameBrand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    productsCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Brand", brandSchema);
