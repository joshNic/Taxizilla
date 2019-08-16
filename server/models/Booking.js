const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  pickUp: {
    type: Object,
    required: true
  },
  dropOff: {
    type: Object,
    required: true
  },
  fare: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('booking', BookingSchema);
