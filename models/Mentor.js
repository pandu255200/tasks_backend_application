const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
});

module.exports = mongoose.model('Mentor', mentorSchema);
