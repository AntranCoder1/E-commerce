require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

const authRouter = require('./routes/Auth.router');
const userRouter = require('./routes/User.router');
const productRouter = require('./routes/Product.router');
const cartRouter = require('./routes/Cart.router');
const orderRouter = require('./routes/Order.router');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@e-commerce.a51mo.mongodb.net/E-commerce?retryWrites=true&w=majority`
        )
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB();

// middleware
app.use(express.json());
app.use(morgan("common"));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);

const port = 5000;
app.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://localhost:${port}`)
});