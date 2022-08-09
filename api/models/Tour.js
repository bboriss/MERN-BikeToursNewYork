const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  tripduration: {
    type: Number,
    // required: [true, "A tour must have a calculated duration"],
  },
  "start station name": {
    type: String,
    required: [true, "A tour must have a start station name"],
    unique: true,
    trim: true,
  },
  "start station location": {
    coordinates: [String],
  },
  "end station location": {
    coordinates: [String],
  },
  "start time": {
    type: Date,
    required: [true, "A tour must have a start date"],
  },
  "stop time": {
    type: Date,
    required: [true, "A tour must have an end date"],
  },
});

const Tour = mongoose.model("Trip", tourSchema);

module.exports = Tour;
