var express = require('express'),
   adminRouter = express.Router(),
   princessDAO = require('../controller/princessDAO');

function checkAuthenticate(req, res, next) {
   next();
}

adminRouter.post('/princessList', checkAuthenticate, (req, res) => {
   princessDAO.getList().then(result => {
      res.json(result.data);
   }).catch(e => {
      res.send(e.message);
   })
});

adminRouter.post('/princess/:slug', checkAuthenticate, (req, res)=>{
   princessDAO.detail(req.params.slug).then(result=>{
      res.json(result.data)
   }).catch(e=>{
      res.send(e.message);
   })
});