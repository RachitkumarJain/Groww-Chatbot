const express = require('express');
const orderHelper = require('../helpers/order_helper');
const orderValidator = require('../validators/order_validators');
const requireLogin = require('../utils/requirelogin');
const requireAdminLogin = require('../utils/requireAdminLogin');

let router = express.Router();

router.get('/:id', requireLogin, orderHelper.getOrder);
router.get('/', requireLogin, orderHelper.getAllOrder);
router.post('/', requireLogin, orderValidator.palceOrderPostInValidator, orderHelper.placeOrder);
router.put('/:id', requireAdminLogin, orderValidator.updateOrderStatusValidator, orderHelper.updateOrderStatus);

module.exports = router;