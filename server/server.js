require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const empRoutes = require("./routes/empRoute")
const bannerRoute = require('./routes/bannerRoutes')
const productRoute = require('./routes/productRoutes')
const orderRoute = require('./routes/orderRoutes')
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes)
app.use("/api/empUser",empRoutes)
app.use('/api/banner',bannerRoute)
app.use('/api/product',productRoute)
app.use('/api/order',orderRoute)



const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}`));
