const mongoose = require('mongoose');

const DriverSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  nationalID: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  vehicle: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('driver', DriverSchema);
