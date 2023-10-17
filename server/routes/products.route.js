const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');

router.route('/')
        .get(productsControllers.getAllProducts)

router.route('/headphones')
        .get(productsControllers.headphones)

router.route('/speakers')
        .get(productsControllers.speakers)

router.route('/earphones')
        .get(productsControllers.earphones)


module.exports = router;