// var express = require('express');
const router = require('express').Router();
const views = require('./abs-routes').views;

router.use(function( req,res,next) {
  console.log(" route-eco1 req.path", req.path);  
  //console.log("req", req);
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.send(req.path);
  res.sendFile('/eco1.html', { root : views},(err) => { 
    if (err) console.log(err);
    ;
  });
});

router.get('/report', function(req, res, next) {
  //res.render('index', { title: 'Express' });
 // res.send("Eco1 report");
//  res.sendFile('/eco1.html',(err) => {
  res.sendFile('/index.html', { root : views}, (err) => {
     if (err) console.log(err);
     ;
   });
});

module.exports = router;
