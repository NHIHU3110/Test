const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String }
});

module.exports = mongoose.model('Customer', CustomerSchema);
