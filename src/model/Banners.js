const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    targetScreen: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Banner", bannerSchema);
