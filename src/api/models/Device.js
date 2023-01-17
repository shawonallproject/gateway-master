const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceSchema = new Schema(
  {
    Gateway: { type: Schema.Types.ObjectId, ref: "Gateway", required: true },
    UID: { type: Number, required: true },
    Vendor: { type: String, required: false, default: null },
    OnlineStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", DeviceSchema);
