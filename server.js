require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

var corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoutes);

app.get("/", (req, resp) => {
  resp.send("Hello from NODE API");
});

app.use(errorMiddleware);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to mongoDB");

    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("error");
  });
