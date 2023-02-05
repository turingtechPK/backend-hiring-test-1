const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DurationSchema = new Schema(
  {
    min: { type: Number, required: true },
    sec: { type: Number, required: true },
  },
  { _id: false }
);

const CallSchema = new Schema(
  {
    caller: {
      type: String,
      required: false,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    callDuration: {
      type: DurationSchema,
      default: function () {
        const inSec = Math.round((this["endTime"] - this["startTime"]) / 1000);
        return { min: Math.floor(inSec / 60), sec: inSec % 60 };
      },
      required: true,
    },
    attachment: {
      type: String,
      required: false,
    },
    options: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    collection: "calls",
  }
);

const Calls = mongoose.model("calls", CallSchema);

module.exports = {
  CallSchema,
  Calls,
};
