const asyncWrapper = require('../middlewares/asyncWrapper');
const Order = require('../models/order.model');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');

const getAllOrders = asyncWrapper(
    async(req, res) => {
        const orders = await Order.find({"__v": false});
        res.status(200).json({status: httpStatusText.SUCCESS, data: {orders}});
    }
)

const getMyOrders = asyncWrapper(
    async(req, res) => {
        const userEmail = req.body.email;
        const orders = await Order.find({email: userEmail},{"__v": false});
        res.status(200).json({status: httpStatusText.SUCCESS, data: {orders}});
    }
)

const createOrder = asyncWrapper(
    async(req, res, next) => {
        const {items, totalPrice, email, img} = req.body;

        if (!items || !Array.isArray(items) || items.length === 0 || !totalPrice || !email) {
            const err = appError.create('Invalid request data', 400, httpStatusText.ERROR);
            return next(err);
        }

        const orderItems = [];
        
        for(const item of items){
            const {title, quantity, price, img} = item;
            if (!title || !quantity || !price || !img) {
                const err = appError.create('Invalid item data', 400, httpStatusText.ERROR);
                return next(err);
            }
            const orderItem = {
                title,
                img,
                price,
                quantity
            };
            orderItems.push(orderItem);
        };

        const newOrder = new Order({
            items: orderItems,
            totalPrice,
            email
        });

        await newOrder.save();

        res.status(201).json({status: httpStatusText.SUCCESS, data: newOrder});
    }
)

module.exports = {
    getAllOrders,
    getMyOrders,
    createOrder
};