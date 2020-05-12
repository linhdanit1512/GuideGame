var express = require('express'),
   adminRouter = express.Router(),
   url = require('url'),
   routeLink = require('../util/link'),
   encript = require('../util/encript'),
   princessDAO = require('../controller/princessDAO'),
   skillDAO = require('../controller/skillDAO');

function checkAuthenticate(req, res, next) {
   next();
}

adminRouter.post(routeLink.add_princess, checkAuthenticate, (req, res) => {
   let data = req.body;
   princessDAO.addNew(data).then(data => {
      res.json(data);
   }).catch(e => {
      res.json(e);
   })
});

adminRouter.post(routeLink.list_princess, checkAuthenticate, (req, res)=>{
   princessDAO.find({}).populate({
      path: 'princessLevels',
      populate: {path: 'skill'}
   }).exec((e, data)=>{
      if(e){
         res.json(e);
      }else{
         res.json(data);
      }
   })
})

adminRouter.post(routeLink.check_princess_exist_image, checkAuthenticate, (req, res)=>{
   let data = req.body;
   princessDAO.checkImage(data).then(data=> res.send(data)).catch(e=>{res.send(e)});
})

adminRouter.post(routeLink.get_princess, checkAuthenticate, (req, res)=>{
   let slug = req.body.slug;
   princessDAO.detail(slug).then(data=>{
      res.json(data);
   }).catch(e=>{
      res.json(e);
   })
});

adminRouter.post(routeLink.update_princess, checkAuthenticate, (req, res)=>{
   let data  = req.body;
   if(data._id){
      princessDAO.edit(data).then(data=>{
         res.json(data);
      }).catch(e=>{
         console.log(e);
         res.json(e);
      })
   }
})


adminRouter.post(routeLink.add_skill, checkAuthenticate, (req, res) => {
   let data = req.body;
   skillDAO.addNew(data, (e, data) => {
      if (e) {
         res.json({ success: false, error: e });
      } else {
         res.json({ success: true, data: data });
      }
   })
});

adminRouter.put(routeLink.update_skill, checkAuthenticate, (req, res)=>{
   let data = req.body;
   data._id = encript.decode(data._id);
   skillDAO.updateInfo(data, (e, data)=>{
      if(e){
         res.json({success: false, error: e});
      }else{
         res.json({success: true, data: data});
      }
   });
})

adminRouter.get(routeLink.get_skill + '/:id', checkAuthenticate, (req, res) => {
   let id = encript.decode(req.params.id);
   skillDAO.findById(id, (e, data) => {
      if (e) {
         res.json({ success: false, error: e });
      } else {
         res.json({ success: true, data: data });
      }
   })
})

adminRouter.get(routeLink.get_skill, checkAuthenticate, (req, res) => {
   skillDAO.find().exec((e, data) => {
      if (e) {
         res.json({ success: false, error: e });
      } else {
         res.json({ success: true, data: data });
      }
   })
})

module.exports = adminRouter;