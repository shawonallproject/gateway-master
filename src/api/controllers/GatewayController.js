const GateWayModel = require("../models/Gateway");
const DeviceModel = require("../models/Device");
/**
 * Gateway Creation with  in body
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) => {
  const dataToSave = req.body;
  const checkDuplicateSerial = await GateWayModel.findOne({
    SerialNumber: dataToSave.SerialNumber,
  });

  if (checkDuplicateSerial) {
    res
      .status(400)
      .json({ success: false, message: "Serial Number already exist" });
  } else {
    const newGateway = await GateWayModel.create(dataToSave);
    res.status(201).json({
      success: true,
      message: "Gateway Created Successfully",
      data: newGateway,
    });
  }
};

/**
 * Fetch Single Gateway information with Id in param
 * @param {*} req
 * @param {*} res
 */
exports.getById = async (req, res) => {
  const gatewayId = req.params.id;
  if (gatewayId) {
    const gateway = await GateWayModel.findById(gatewayId);
    if (gateway) {
      res.status(200).json({
        success: true,
        data: gateway,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid Request" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid Request" });
  }
};

/**
 * Fetch All Gateway information with Id in param
 * @param {*} req
 * @param {*} res
 */
exports.getAll = async (req, res) => {
  const gateway = await GateWayModel.find();
  res.status(200).json({
    success: true,
    data: gateway,
  });
};

/**
 * Update Single Gateway information with Id in param
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
  const gatewayId = req.params.id;
  if (gatewayId) {
    const gateway = await GateWayModel.findById(gatewayId);
    if (gateway) {
      const dataToSave = req.body;
      await GateWayModel.findOneAndUpdate({ _id: gatewayId }, dataToSave, {
        upsert: false,
      });
      res.status(200).json({
        success: true,
        message: "Gateway Updated Successfull",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid Request" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid Request" });
  }
};

/**
 * Delete Gateway with id in param
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  const gatewayId = req.params.id;
  if (gatewayId) {
    const devices = await DeviceModel.find({ Gateway: gatewayId });
    if (devices) {
      devices.forEach(async (element) => {
        await DeviceModel.findByIdAndDelete(element._id);
      });
    }
    const gateway = await GateWayModel.findById(gatewayId);
    if (gateway) {
      await gateway.remove();
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
