const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
});

module.exports = mongoose.model('Member', memberSchema);
