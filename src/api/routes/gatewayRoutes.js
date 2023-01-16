// eslint-disable-next-line new-cap
const routes = require("express").Router();
const gatewayController = require("../controllers/GatewayController");

routes.post("/", gatewayController.create);
routes.get("/", gatewayController.getById);
routes.get("/all", gatewayController.getAll);
routes.patch("/", gatewayController.update);
routes.delete("/", gatewayController.delete);

module.exports = routes;
