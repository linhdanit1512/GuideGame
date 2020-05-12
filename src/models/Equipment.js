const mongoose = require('mongoose');

var equipSchema = new mongoose.Schema({
   type: Number, //ao 1 mu 2 kiem 3 nhan 4
   name: String,
   img: String,
   color: String,
   star: Number,
   attribute: {
      name: String,
      value: Number,
      unit: String
   },
   suit: [{
      name: String,
      value: Number,
      unit: String
   }]
});

module.exports = mongoose.model('Equipment', equipSchema);