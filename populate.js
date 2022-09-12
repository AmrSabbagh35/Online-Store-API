const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDb = require("./config/db");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log("success !");
  } catch (error) {
    console.log(error);
  }
};

start();
