const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 24,
    min: 3,
  },

  password: {
    type: String,
    required: true,
    max: 30,
    min: 4,
  },

  avatar: {
    type: String,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'players',
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Team', teamSchema);
