const mongoose = require('mongoose');

const productAttributeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    nameAttribute: {
        type: String
    },
    values: [{
        type: String
    }]
}, { timestamps: true });

module.exports = mongoose.model("ProductAttribute", productAttributeSchema);
