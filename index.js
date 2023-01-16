require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./server");

const PORT = process.env.PORT || 5000;

/* =================================
 * mongodb configuration
 * ================================*/
const mongooseOptions = {
  useNewUrlParser: true,
};

mongoose
  .connect("mongodb://localhost:27017/Gateway", mongooseOptions)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Gateway Service api listening on port ${PORT}`);
    });
  });
