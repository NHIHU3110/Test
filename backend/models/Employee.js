const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'Employee', enum: ['Admin', 'Employee'] }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
