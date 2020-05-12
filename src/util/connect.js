var mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, {
   useNewUrlParser: true,
   useFindAndModify: false,
   useUnifiedTopology: true
});