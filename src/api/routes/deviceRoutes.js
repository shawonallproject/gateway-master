// eslint-disable-next-line new-cap
const routes = require("express").Router();
const deviceController = require("../controllers/DeviceController");

routes.post("/", deviceController.create);
routes.get("/", deviceController.getById);
routes.get("/all", deviceController.getAll);
routes.patch("/", deviceController.update);
routes.delete("/", deviceController.delete);

module.exports = routes;
