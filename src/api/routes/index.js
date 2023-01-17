// eslint-disable-next-line new-cap
const routes = require("express").Router();
const gatewayRoutes = require("./gatewayRoutes");
const deviceRoutes = require("./deviceRoutes");

routes.use("/gateway", gatewayRoutes);
routes.use("/device", deviceRoutes);

module.exports = routes;
