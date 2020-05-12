const mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
   senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   receiver: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   content: String,
   img: String,
   group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
});

module.exports = mongoose.model('Chat', chatSchema);
