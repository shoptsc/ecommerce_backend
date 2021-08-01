require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const mongoose = require("mongoose");
const productRouter = require("./routers/products")
const orderRouter = require("./routers/orders")
const userRouter = require("./routers/users")
const categoryRouter = require("./routers/categories")

const api = process.env.API_URL;

const app = express();

app.use(cors());
app.options("*", cors())

app.use(express.json());
app.use(morgan("tiny"));
app.use(`${api}/products`, productRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/categories`, categoryRouter);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Database connected successfully")
}).catch((err) => console.log(err))

app.listen(3000, () => {
    console.log("server running on port 3000")
})