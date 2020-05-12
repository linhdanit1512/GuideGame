const mongoose = require('mongoose');

var princessLevelSchema = new mongoose.Schema({
   princess : {type: mongoose.Schema.Types.ObjectId, ref: 'Princess'},
   avt: String,
   className: String,
   star: Number,
   maxLevel: Number,
   awaken: Boolean,
   skill: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}],
   resource: [String],
   affect: String,
   strength: Number,
   HP: {type: Number, default: 0},
   ATT: {type: Number, default: 0},
   DEF: {type: Number, default: 0},
   speed: {type: Number, default: 0},
   abilitiDamage: {type: Number, default: 0},
   hit: {type: Number, default: 0},
   dodge: {type: Number, default: 0},
   critHit: {type: Number, default: 0},
   critHitDamage: {type: Number, default: 0},
   defPen: {type: Number, default: 0},
   freeControlRate: {type: Number, default: 0},
   Mitigation: {type: Number, default: 0},
   realDamageRate: {type: Number, default: 0}
});

module.exports = mongoose.model('PrincessLevel', princessLevelSchema);