const express = require('express');
const productHelper = require('../helpers/product_helper');
const requireAdminLogin = require('../utils/requireAdminLogin');

let router = express.Router();
router.post('', requireAdminLogin, productHelper.createProduct);
router.get('', productHelper.fetchAllProduct);
router.get('/:id', productHelper.fetchProduct);
router.put('/:id', requireAdminLogin, productHelper.updateProduct);

module.exports = router;