const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controllers');
const userRoles = require('../utils/userRoles');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');

router.route('/signup')
                .post(authControllers.signUp);

router.route('/login')
                .post(authControllers.login);

router.route('/logout')
                .post(authControllers.logout);

router.route('/')
                .get(verifyToken, allowedTo(userRoles.ADMIN), authControllers.getAllUsers);

router.route('/addUser')
                .post(verifyToken, allowedTo(userRoles.ADMIN), authControllers.addUser);

router.route('/deleteUser')
                .delete(verifyToken, allowedTo(userRoles.ADMIN), authControllers.deleteUser);


module.exports = router;