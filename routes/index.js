var express = require('express');
var router = express.Router();
const views = require('./abs-routes').views;

/* GET home page. */
router.use(function( req,res,next) {
  console.log("index req.path", req.path);  
  //console.log("req", req);
  next();
});

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' }); 
  console.log(' get index.html');

  res.sendFile('/index.html',(err) => {   
    if (err) {
      console.log(err)
    } else {
      console.log(" index.html is sended");
    }
  });
});

router.post('/restart', function(req, res, next) {
  console.log(' restart request', req.param.reason );
  process.exit();
  ;
});


module.exports = router;
