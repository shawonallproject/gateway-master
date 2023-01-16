const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceSchema = new Schema(
  {
    UID: { type: Number, required: true, unique: true },
    Vendor: { type: String, required: true },
    OnlineStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", DeviceSchema);
