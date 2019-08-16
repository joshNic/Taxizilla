const mongoose = require('mongoose');

const DriverLocationSchema = mongoose.Schema({
  driverId: {
    type: String,
    required: true
  },
  coordinate: {
    type: Object,
    required: true
  },
  socketId: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('driverlocation', DriverLocationSchema);
