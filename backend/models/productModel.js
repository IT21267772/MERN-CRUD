const mongoose = require ('mongoose')

const productSchema = mongoose.Schema({
    productName : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    },
    image : {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const product = mongoose.model('Product', productSchema)

module.exports = product