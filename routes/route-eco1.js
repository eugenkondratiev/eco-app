// var express = require('express');
const router = require('express').Router();
const views = require('./abs-routes').views;

router.use(function( req,res,next) {
  console.log(" route-eco1 req.path", req.path);  
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/eco1.html', { root : views},(err) => { 
    if (err) console.log(err);
    ;
  });
});

router.get('/report', function(req, res, next) {
  res.sendFile('/index.html', { root : views}, (err) => {
     if (err) console.log(err);
     ;
   });
});

module.exports = router;
