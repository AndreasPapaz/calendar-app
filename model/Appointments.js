const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  Date: {
    type: Date
  },
  body: {
    type: String
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
