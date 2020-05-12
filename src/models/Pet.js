const mongoose = require('mongoose');

var petSchema = new mongoose.Schema({
   name: { type: String, text: true },
   star: Number,
   skill: [{ type: mongoose.Schema.Types.ObjectId, ref : 'Skill'}],
   rank: Number,
   desc: String,
   HP: Number,
   ATT: Number
});

module.exports = mongoose.model('Pet', petSchema);