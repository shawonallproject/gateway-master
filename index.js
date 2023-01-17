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
// const mongoUrl = "mongodb://localhost:27017/Gateway";
const mongoUrl =
  "mongodb+srv://shawonallproject:wsit97480@cluster0.cvgevwq.mongodb.net/Gateway?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, mongooseOptions).then(() => {
  app.listen(PORT, () => {
    console.log(`Gateway Service api listening on port ${PORT}`);
  });
});
