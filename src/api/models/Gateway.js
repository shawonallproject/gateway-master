const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GatewaySchema = new Schema(
  {
    SerialNumber: { type: String, required: true, unique: true },
    Name: { type: String, required: false, default: null },
    IPV4Address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gateway", GatewaySchema);
