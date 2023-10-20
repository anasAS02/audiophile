const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');

router.route('/')
                .get(verifyToken, allowedTo(userRoles.ADMIN), ordersControllers.getAllOrders);

router.route('/myOrders')
                .post(verifyToken, ordersControllers.getMyOrders);

router.route('/create')
                .post(verifyToken, ordersControllers.createOrder);

router.route('/save')
                .post(verifyToken, ordersControllers.saveOrder);


module.exports = router;