require('../util/connect');
var msg = require('../util/message');
var Princess = require('../models/Princess');
var Comment = require('../models/Comment');
var PrincessLevel = require('../models/PrincessLevel');
var fs = require('fs');
Princess.addNew = (data) => {
   return new Promise((resolve, reject) => {

      let p = new Princess();
      let princessData = ['name', 'slug', 'level', 'elemental', 'vote', 'use', 'difficult', 'regency', 'keyword'];
      for (let attr in data) {
         if (princessData.includes(attr)) {
            p[attr] = data[attr];
         }
      }
      p.save((e, result) => {
         if (e) {
            console.error(e);
            return reject({ success: false, message: msg.error.save_error });
         } else {
            console.log(result._id);
            if (data.princessLevel && data.princessLevel.length > 0) {
               for (let i = 0; i < data.princessLevel.length; i++) {
                  data.princessLevel[i].princess = result._id;
               }
               PrincessLevel.collection.insert(data.princessLevel, (e, docs) => {
                  if (e) {
                     console.error(e);
                     return reject({ success: false, message: msg.error.save_error });
                  } else {
                     return resolve({ success: true, id: result._id, princessLevel: docs });
                  }
               })
            } else {
               return resolve({ success: true, id: result._id });
            }
         }
      });
   });
}

Princess.edit = (data) => {
   return new Promise((resolve, reject) => {
      if (!data._id) return reject({ success: false, message: msg.error.invalid_data });
      let p = {};
      let princessData = ['_id', 'name', 'slug', 'level', 'elemental', 'vote', 'use', 'difficult', 'regency', 'keyword'];
      for (let attr in data) {
         if (princessData.includes(attr)) {
            p[attr] = data[attr];
         }
      }
      Princess.update({ _id: data._id }, { $set: p }).
         exec((e, result) => {
            if (e) {
               console.error(e)
               return reject({ success: false, message: msg.error.save_error });
            } else {
               if (data.princessLevel) {
                  let errorSave = [];
                  data.princessLevel.forEach((plevel, index) => {
                     if (plevel._id) {
                        PrincessLevel.update({ _id: plevel._id }, { $set: plevel }).
                           exec((e, doc) => {
                              if (e) {
                                 errorSave.push(e);
                                 console.error(e);
                              }
                              if (index == data.princessLevel.length - 1) {
                                 resolve({ success: errorSave.length == 0, error: errorSave })
                              }
                           })
                     } else {
                        new PrincessLevel(plevel).save((e, doc) => {
                           if (e) {
                              errorSave.push(e);
                              console.error(e)
                           }
                           if (index == data.princessLevel.length - 1) {
                              resolve({ success: errorSave.length == 0, error: errorSave })
                           }
                        })
                     }
                  });
               } else {
                  return resolve({ success: true });
               }
            }
         });

   })
}

Princess.getList = ()=>{
   return new Promise((resolve, reject)=>{
      Princess.find().populate('princessLevels').exec((e, data)=>{
         if(e){
            reject({success: false, message: msg.error.list});
         }else{
            resolve({success: true, data: data});
         }
      })
   });
}

Princess.detail = (slug)=>{
   return new Promise((resolve, reject)=>{
      Princess.findOne({slug: slug}).populate('princessLevels').populate('comments').exec((e, data)=>{
         if(e){
            console.log(e);
            reject({success: false, message: msg.error.get_info});
         }else if(data){
            resolve({success: true, data: data});
         }else{
            reject({success: false, message: msg.error.empty});
         }
      })
   });
}

Princess.checkExist = (filterData)=>{
   return new Promise((resolve, reject)=>{
      Princess.findOne(filterData).exec((e, data)=>{
         if(e){
            console.log(e);
            reject(true);
         }else if(data){
            resolve(true);
         }else{
            reject(false);
         }
      });
   })
}

Princess.checkImage = (filterData)=>{
   return new Promise((resolve, reject)=>{
      PrincessLevel.findOne(filterData).exec((e, data)=>{
         if(e){
            console.log(e);
            reject(e);
         }else if(data){
            resolve(data);
         }else{
            reject(false);
         }
      });
   })
}

module.exports = Princess;