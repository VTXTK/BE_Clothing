const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nameCategory: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    parentId: {
        type: String,
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
