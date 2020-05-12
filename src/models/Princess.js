const mongoose = require('mongoose');

var princessSchema = new mongoose.Schema({
   name: { type: String, unique: true, text: true },
   slug: String,
   elemental: Number, //thuy 1 moc 2 hoa 3 tho 4 sang 5 toi 6
   vote: {type: Number, default: 0},
   use: {type: Number, default: 0},
   level: String, // F E D C B A S SS
   difficult: [Number],
   regency: Number, //chien binh, linh muc...
   keyword: [String]
},{ toJSON : {virtuals: true}});

princessSchema.virtual('princessLevels', {ref: 'PrincessLevel', localField: '_id', foreignField: 'princess', justOne: false});
princessSchema.virtual('comments', {ref: 'Comment', localField: '_id', foreignField: 'princess', justOne: false});
module.exports = mongoose.model('Princess', princessSchema);