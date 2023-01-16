const DeviceModel = require("../models/Device");

/**
 * Device Creation with  in body
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) => {
  res.status(200).json({ success: true });
};

/**
 * Fetch Single Device information with Id in param
 * @param {*} req
 * @param {*} res
 */
exports.getById = async (req, res) => {
  res.status(200).json({ success: true });
};

/**
 * Fetch All Device information with Id in param
 * @param {*} req
 * @param {*} res
 */
exports.getAll = async (req, res) => {
  res.status(200).json({ success: true });
};

/**
 * Update Single Device information with Id in param
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
  res.status(200).json({ success: true });
};

/**
 * Delete Device with id in param
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  res.status(200).json({ success: true });
};
