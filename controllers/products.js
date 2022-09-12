const Product = require("../models/product");

const getAllproductsStatic = async (req, res) => {
  throw new Error("testing asnyc error");
  res.status(200).json({ msg: "products testing route static" });
};
const getAllproducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryobject = {};

  if (featured) {
    queryobject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryobject.company = company;
  }
  if (name) {
    queryobject.name = { $regex: name, $options: "i" };
  }

  // console.log(queryobject);
  let result = Product.find(req.query);
  if (sort) {
    const sortlist = sort.split(",").join(" ");
    result = result.sort(sortlist);
  } else {
    result = result.sort("createdAt");
  }
  const product = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllproducts,
  getAllproductsStatic,
};
