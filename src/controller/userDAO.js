require('../util/connect');
var msg = require('../util/message');
var User = require('../models/User');

User.loginUsername = (username, password)=>{
   if(!username || !password || username.length>30|| username.length<6 ||password.length>30 || password.length<6){
      return Promise.reject({error: msg.error.invalid_login_username});
   }else{
      return new Promise((resolve, reject)=>{
         User.findOne({
            username: username,
            password: password
         }).populate('friends').populate('group').exec((error, data)=>{
            if(error){
               return reject({error: error.toString()});
            }else{
               return resolve(data);
            }
         });
      })
   }
}

User.loginEmail = (email, password)=>{
   if(!email || !password || email.length>30|| email.length<6){
      return Promise.reject({error: msg.error.invalid_login_email});
   }else{
      return new Promise((resolve, reject)=>{
         User.findOne({
            email: email,
            password: password
         }).populate('friends').populate('group').exec((error, data)=>{
            if(error){
               return reject({error: error.toString()});
            }else{
               return resolve(data);
            }
         });
      })
   }
}

User.fullInfo = (id, callback)=>{
   User.findById(id).populate('friends').populate('group').select({password:-1}).
   exec((error, data)=>{
      if(error){
         callback({error: error});
      }else{
         callback(data);
      }
   })
}

module.exports = User;