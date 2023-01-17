// eslint-disable-next-line new-cap
const routes = require("express").Router();
const gatewayController = require("../controllers/GatewayController");
const gatewayValidator = require("../validator/Gateway");

routes.post("/", gatewayValidator.createOrUpdate, gatewayController.create);
routes.get("/all", gatewayController.getAll);
routes.get("/:id", gatewayController.getById);
routes.put("/:id", gatewayValidator.createOrUpdate, gatewayController.update);
routes.delete("/:id", gatewayController.delete);

module.exports = routes;
