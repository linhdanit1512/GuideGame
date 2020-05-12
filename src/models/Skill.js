const mongoose = require('mongoose');

var skillSchema = new mongoose.Schema({
   name: { type: [String], text: true },
   type: { type: String },
   img: { type: String },
   target: { type: String },
   nEnemies: { type: Number },
   desc: { type: [String], text: true },
   keyword: [String],
   level: {type: Number, default: 1}, //en,
   affect: [{
      name: String,
      value: Number,
      unit: String,
      target: Number
   }]
});

module.exports = mongoose.model('Skill', skillSchema);