const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import models
const Category = require('../models/Category');
const Product = require('../models/Product');
const Employee = require('../models/Employee');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const OrderDetails = require('../models/OrderDetails');

const models = {
    categories: Category,
    products: Product,
    employees: Employee,
    customers: Customer,
    orders: Order,
    orderdetails: OrderDetails
};

// Login Route
router.post('/login', async (req, res) => {
    const { username, password, type } = req.body;
    // type can be 'employee' or 'customer'
    let user = null;
    if (type === 'employee') {
        user = await Employee.findOne({ username, password });
    } else {
        user = await Customer.findOne({ username, password });
    }

    if (user) {
        res.json({ success: true, user, type: type === 'employee' ? user.role : 'Customer' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Revenue Route -> sum of totalAmount from paid Orders
router.get('/stats/revenue', async (req, res) => {
    try {
        const orders = await Order.find({ status: 'paid' });
        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        res.json({ totalRevenue, ordersCount: orders.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// VIP Customers Route -> top N customers by purchase value
router.get('/stats/vip', async (req, res) => {
    try {
        const vips = await Order.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: '$customerId', totalSpent: { $sum: '$totalAmount' } } },
            { $sort: { totalSpent: -1 } },
            { $limit: 10 },
            { $lookup: { from: 'customers', localField: '_id', foreignField: '_id', as: 'customerData' } },
            { $unwind: '$customerData' },
            { $project: { _id: 1, totalSpent: 1, name: '$customerData.name', username: '$customerData.username', email: '$customerData.email' } }
        ]);
        res.json(vips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Generic CRUD
router.get('/:collection', async (req, res) => {
    const Model = models[req.params.collection];
    if (!Model) return res.status(404).json({ error: 'Collection not found' });
    try {
        let query = Model.find();
        // Support basic search for specific fields if provided
        if (Object.keys(req.query).length > 0) {
            // E.g. search products by price or model
            Object.keys(req.query).forEach(key => {
                if (req.query[key]) {
                    query = query.where(key).equals(req.query[key]);
                }
            });
        }
        const docs = await query.exec();
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/:collection', async (req, res) => {
    const Model = models[req.params.collection];
    if (!Model) return res.status(404).json({ error: 'Collection not found' });
    try {
        const doc = new Model(req.body);
        await doc.save();
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:collection/:id', async (req, res) => {
    const Model = models[req.params.collection];
    if (!Model) return res.status(404).json({ error: 'Collection not found' });
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(doc);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:collection/:id', async (req, res) => {
    const Model = models[req.params.collection];
    if (!Model) return res.status(404).json({ error: 'Collection not found' });
    try {
        await Model.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
