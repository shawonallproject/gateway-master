const routes = require('express').Router(),
    gatewayRoutes = require('./gatewayRoutes'),
    deviceRoutes = require('./deviceRoutes');
    
routes.use('/gateway', gatewayRoutes)
routes.use('/device', deviceRoutes)

module.exports = routes