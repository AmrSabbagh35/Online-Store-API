const express = require("express");
const dotenv = require("dotenv");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const productsRouter = require("./routes/products");
require('express-async-errors')
// load config file

dotenv.config({ path: "./config/config.env" });

// async errors

const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send('<h1> Store api </h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products",productsRouter); 

// product route

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    connectDB();
    app.listen(port, console.log(`server is lisening to port: ${port} ...`));
  } catch (error) {
    console.log(error);
  }
};

start();
