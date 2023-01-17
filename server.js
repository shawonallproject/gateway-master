require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

/* =================================
 * app configuration
 * ================================*/
const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(cors());

/* =================================
 * routes
 * ================================*/
const routes = require("./src/api/routes");
app.use("/api", routes);

module.exports = app;
