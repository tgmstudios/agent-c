const express = require('express');
const router = express.Router();

const usersRoutes = require('./users');
const productsRoutes = require('./products');

// Mount the routes on their respective paths
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

module.exports = router;
