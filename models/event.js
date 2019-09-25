const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  //Sets relationship that an event has one user that is why we use an object.
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Event", eventSchema);
