const DeviceModel = require("../models/Device");
const GatewayModel = require("../models/Gateway");
const ObjectId = require("mongoose").Types.ObjectId;
/**
 * Device Creation with  in body
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) => {
  const dataToSave = req.body;
  const checkGateway = await GatewayModel.findById(dataToSave.Gateway);
  if (checkGateway) {
    const checkDeviceCount = await DeviceModel.countDocuments({
      Gateway: dataToSave.Gateway,
    });

    if (checkDeviceCount < 10) {
      const newDevice = await DeviceModel.create(dataToSave);
      res.status(201).json({
        success: true,
        message: "Device Created Successfully",
        data: newDevice,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Gateway already filled up with 10 devices.Can't create more.",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Gateway doesn't exist",
    });
  }
};

/**
 * Fetch Single Device information with Id in param
 * @param {*} req
 * @param {*} res
 */
exports.getById = async (req, res) => {
  const deviceId = req.params.id;
  if (deviceId) {
    const device = await DeviceModel.findById(deviceId);
    if (device) {
      res.status(200).json({
        success: true,
        data: device,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid Request" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid Request" });
  }
};

/**
 * Fetch All Device information with Id in param
 * @param {*} req
 * @param {*} res
 */
exports.getAll = async (req, res) => {
  const device = await DeviceModel.find();
  res.status(200).json({
    success: true,
    data: device,
  });
};

/**
 * Fetch Single Device information with Gateway Id in param
 * @param {*} req
 * @param {*} res
 */
exports.getByGatewayId = async (req, res) => {
  const gatewayId = req.params.id;
  if (gatewayId) {
    const devices = await DeviceModel.find({ Gateway: gatewayId });
    res.status(200).json({
      success: true,
      data: devices,
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid Request" });
  }
};

/**
 * Update Single Device information with Id in param
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
  const deviceId = req.params.id;
  if (deviceId) {
    const dataToSave = req.body;
    const checkGateway = await GatewayModel.findById(dataToSave.Gateway);
    if (checkGateway) {
      const device = await DeviceModel.findById(deviceId);
      if (device) {
        await DeviceModel.findOneAndUpdate({ _id: deviceId }, dataToSave, {
          upsert: false,
        });
        res.status(200).json({
          success: true,
          message: "Device Updated Successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Gateway doesn't exist",
        });
      }
    } else {
      res.status(400).json({ success: false, message: "Invalid Request" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid Request" });
  }
};

/**
 * Delete Device with id in param
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  const deviceId = req.params.id;
  if (deviceId) {
    const device = await DeviceModel.findById(deviceId);
    if (device) {
      await device.remove();
      res.status(200).json({
        success: true,
        message: "Deleted Successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid Request" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid Request" });
  }
};
