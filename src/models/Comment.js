const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
   content: { type: String, maxlength: 5000, minlength: 1 },
   images: [String],
   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   princess: { type: mongoose.Schema.Types.ObjectId, ref: 'Princess' },
   page: { type: String },
   level: Number,
   replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Comment', commentSchema);