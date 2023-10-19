const Product = require('../models/product.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');

const getAllProducts = asyncWrapper(
    async(req, res) => {
        const products = await Product.find();
        res.status(200).json({status: httpStatusText.SUCCESS, data: {products}});
    }
)

const getSingleProduct = asyncWrapper(
    async(req, res) => {
        const productId = req.params.productId;
        const findProduct = await Product.findById({_id: productId});
        if(!findProduct){
            const err = appError.create('This product is not found', httpStatusText.ERROR);
            return err;
        }
        res.status(200).json({status: httpStatusText.SUCCESS, data: findProduct})
    }
)

const headphones = asyncWrapper(
    async(req, res) => {
        const products = await Product.find({category: "headphones"});
        res.status(200).json({status: httpStatusText.SUCCESS, data: {products}})
    }
)

const speakers = asyncWrapper(
    async(req, res) => {
        const products = await Product.find({category: "speakers"});
        res.status(200).json({status: httpStatusText.SUCCESS, data: {products}})
    }
)
const earphones = asyncWrapper(
    async(req, res) => {
        const products = await Product.find({category: "earphones"});
        res.status(200).json({status: httpStatusText.SUCCESS, data: {products}})
    }
)

module.exports = {
    getAllProducts,
    getSingleProduct,
    headphones,
    speakers,
    earphones
}