const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: String,
    info: String,
    price: Number,
    mainImg: String,
    imgTwo: String,
    imgThree: String,
    imgFour: String,
    featuresOne: String,
    featuresTwo: String,
    boxOne: String,
    boxTwo: String,
    boxThree: String,
    boxFour: String,
    category: String,
})

module.exports = mongoose.model('Product', productSchema);