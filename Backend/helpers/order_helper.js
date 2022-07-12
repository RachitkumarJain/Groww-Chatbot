const models = require('../models/order_models');

let orderHelper = {};

orderHelper.getOrder = async (req, res) => {
    let order = await models.Order.findById(req.params.id);
    if (!order) {
        res.status(404).send({ msg: 'Not Found' });
    } else {
        order = await order.getPayload();
        res.status(200).send(order);
    }
}

orderHelper.getAllOrder = async (req, res) => {
    try {
        let orders = await models.Order.find({ userId: req.data });
        let response = []
        for (let i = 0; i < orders.length; i++) {
            let payload = await orders[i].getPayload();

            if (payload.product.category == req.query.category) {
                response.push(payload)
            }
        }
        res.status(200).json(response);
    } catch (e) {
        console.log(e.name);
        res.status(500).json({ msg: "Server Error" });
    }
}

orderHelper.placeOrder = async (req, res) => {
    try {
        const newOrder = new models.Order({
            userId: req.data,
            productId: req.body.productId,
            orderSpecs: req.body.orderSpecs
        });
        await newOrder.save();
        res.status(201).json({ msg: "Success" });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}

orderHelper.updateOrderStatus = async (req, res) => {
    try {
        let order = await models.Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
        res.status(200).json({ msg: "Success" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

module.exports = orderHelper;