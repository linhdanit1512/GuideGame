require('../util/connect');
var msg = require('../util/message');
var Skill = require('../models/Skill');

Skill.getList = (callback)=>{
   Skill.find().exec((e, data)=>{
      if(e){
         callback(e, null);
      }else{
         callback(null, data);
      }
   })
}

Skill.addNew = (data, callback)=>{
   let item = new Skill(data);
   item.save((e, result)=>{
      if(e){
         callback(e, null);
      }else{
         callback(null, data);
      }
   });
}

Skill.updateInfo = (data, callback)=>{
   Skill.update({_id: data._id}, {$set: data}).exec((e, data)=>{
      if(e) callback(e, null);
      else callback(null, data);
   })
}

module.exports = Skill;