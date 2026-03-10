const mongoose = require('mongoose');

// Import models
const Category = require('./models/Category');
const Product = require('./models/Product');
const Employee = require('./models/Employee');
const Customer = require('./models/Customer');
const Order = require('./models/Order');
const OrderDetails = require('./models/OrderDetails');

mongoose.connect('mongodb://127.0.0.1:27017/exam_db');

async function seed() {
    await mongoose.connection.dropDatabase();

    const categories = await Category.insertMany([
        { name: 'Electronics', description: 'Gadgets and devices' },
        { name: 'Clothing', description: 'Apparel and accessories' },
        { name: 'Books', description: 'Printed and electronic books' },
        { name: 'Home', description: 'Furniture and decor' },
        { name: 'Sports', description: 'Sports equipment' }
    ]);

    const products = await Product.insertMany([
        { name: 'Smartphone', price: 699, model: 'X1', madeBy: 'TechCorp', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800', categoryId: categories[0]._id },
        { name: 'Laptop', price: 999, model: 'Pro', madeBy: 'TechCorp', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800', categoryId: categories[0]._id },
        { name: 'T-Shirt', price: 20, model: 'Basic', madeBy: 'FashionInc', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', categoryId: categories[1]._id },
        { name: 'Novel', price: 15, model: 'Hardcover', madeBy: 'PublisherX', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800', categoryId: categories[2]._id },
        { name: 'Sofa', price: 500, model: 'Comfort', madeBy: 'HomeCo', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800', categoryId: categories[3]._id }
    ]);

    const employees = await Employee.insertMany([
        { username: 'admin', password: '123', name: 'Alice Admin', role: 'Admin' },
        { username: 'emp1', password: '123', name: 'Bob Employee', role: 'Employee' },
        { username: 'emp2', password: '123', name: 'Charlie', role: 'Employee' },
        { username: 'emp3', password: '123', name: 'Dave', role: 'Employee' },
        { username: 'emp4', password: '123', name: 'Eve', role: 'Employee' }
    ]);

    const customers = await Customer.insertMany([
        { username: 'cust1', password: '123', name: 'Customer One', email: 'c1@test.com', phone: '111222' },
        { username: 'cust2', password: '123', name: 'Customer Two', email: 'c2@test.com', phone: '222333' },
        { username: 'cust3', password: '123', name: 'Customer Three', email: 'c3@test.com', phone: '333444' },
        { username: 'cust4', password: '123', name: 'Customer Four', email: 'c4@test.com', phone: '444555' },
        { username: 'cust5', password: '123', name: 'Customer Five', email: 'c5@test.com', phone: '555666' }
    ]);

    const orders = await Order.insertMany([
        { customerId: customers[0]._id, totalAmount: 719, status: 'paid' },
        { customerId: customers[1]._id, totalAmount: 999, status: 'paid' },
        { customerId: customers[2]._id, totalAmount: 35, status: 'unpaid' },
        { customerId: customers[3]._id, totalAmount: 500, status: 'paid' },
        { customerId: customers[4]._id, totalAmount: 500, status: 'paid' }
    ]);

    const orderDetails = await OrderDetails.insertMany([
        { orderId: orders[0]._id, productId: products[0]._id, quantity: 1, price: 699 },
        { orderId: orders[0]._id, productId: products[2]._id, quantity: 1, price: 20 },
        { orderId: orders[1]._id, productId: products[1]._id, quantity: 1, price: 999 },
        { orderId: orders[2]._id, productId: products[2]._id, quantity: 1, price: 20 },
        { orderId: orders[2]._id, productId: products[3]._id, quantity: 1, price: 15 }
    ]);

    console.log('Database seeded successfully');
    process.exit();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
