const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

app.use(express.json());

//routes
app.get("/", (req, resp) => {
  resp.send("Hello from NODE API");
});

app.get("/products", async (req, resp) => {
  try {
    const products = await Product.find({});
    resp.status(200).json(products);
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params;
    const product = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {}
});
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update a product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with this ${id}` });
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a product

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({
          message: `cannot find and delete a product with this id ${id}`,
        });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:40Eh2XveVC6vWmLB@nodeapi.loi0ge8.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(3000, () => {
      console.log("Node API app is running on port 3000");
    });
  })
  .catch(() => {
    console.log("error");
  });
