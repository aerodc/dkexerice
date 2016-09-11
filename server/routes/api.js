var express = require('express');
var router = express.Router();
var daoService = require('../service/DaoService');
var _=require('lodash');
 
//todo file exist or not
router.get('/columns', function(req, res, next) {

    daoService.getAllColumns()(function(data){
        res.json(data);
    });

});

router.get('/:col',function(req,res,next){

    var column=_.replace(req.params.col,'%20',' ');

    daoService.getValuesByCol(column)(function(data){
       res.json(data);
    });

});
 
router.get('/totalnb/:col',function(req,res,next){

  var column=_.replace(req.params.col,'%20',' ');

  daoService.getTotalNb(column)(function(data){
      res.json(data);
  });

});

module.exports = router;