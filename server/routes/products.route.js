const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');


router.route('/headphones')
.get(productsControllers.headphones)

router.route('/speakers')
.get(productsControllers.speakers)

router.route('/earphones')
.get(productsControllers.earphones)

router.route('/:productId')
        .get(productsControllers.getSingleProduct)

router.route('/')
        .get(productsControllers.getAllProducts)

module.exports = router;