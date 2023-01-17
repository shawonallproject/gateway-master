// eslint-disable-next-line new-cap
const routes = require("express").Router();
const deviceController = require("../controllers/DeviceController");
const deviceValidator = require("../validator/Device");

routes.post("/", deviceValidator.createOrUpdate, deviceController.create);
routes.get("/all", deviceController.getAll);
routes.get("/:id", deviceController.getById);
routes.get("/gateway/:id", deviceController.getByGatewayId);
routes.put("/:id", deviceValidator.createOrUpdate, deviceController.update);
routes.delete("/:id", deviceController.delete);

module.exports = routes;
