const router = require('express').Router();
const views = require('./abs-routes').views;

router.use(function( req,res,next) {
  console.log("req.path", req.path);  
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/eco2.html', { root : views},(err) => { 
    if (err) console.log(err);
    ;
  });
});

router.get('/report', function(req, res, next) {
  res.sendFile('/eco2.html', { root : views}, (err) => {
     if (err) console.log(err);
     ;
   });
});

module.exports = router;
