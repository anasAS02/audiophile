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

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const createOrder = asyncWrapper(async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            submit_type: "auto",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.title,
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cart`,
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const saveOrder = asyncWrapper(
    async (req, res, next) => {

        const {items, totalAmount, email} = req.body;
        const orderItems = [];

        for(const item of items){
        const {title, quantity, price, mainImg} = item;
        if (!title || !quantity || !price || !mainImg) {
            const err = appError.create('Invalid item data', 400, httpStatusText.ERROR);
            return next(err);
        }
        const orderItem = {
            title,
            mainImg,
            price,
            quantity
        };
        orderItems.push(orderItem);
    };

    const newOrder = new Order({
        items: orderItems,
        totalAmount,
        email
    });
    await newOrder.save();
    res.status(200).json('done')
});


module.exports = {
    getAllOrders,
    getMyOrders,
    createOrder,
    saveOrder
};