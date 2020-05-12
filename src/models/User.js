const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   username: { type: String, maxlength: 30, minlength: 6, unique: true, text: true, required: true },
   password: { type: String, required: true },
   email: { type: String, unique: true, text: true },
   displayName: { type: String, text: true },
   logo: { type: String, default: 'images/logo/blank-profile.png' },
   friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
   group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
   phone: { type: String, text: true },
   playTime: { type: Date, default: new Date() },
   registerTime: { type: Date, default: new Date() },
   longPlay: { type: String }
}, { toJSON: { password: false } });

module.exports = mongoose.model('User', userSchema);