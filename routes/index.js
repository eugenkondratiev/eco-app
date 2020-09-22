const router = require('express').Router();
const views = require('./abs-routes').views;

/* GET home page. */
router.use(function( req,res,next) {
  // console.log("index req.path", req.path);  
  next();
});

router.get('/', function(req, res, next) {
  // console.log(' get index.html');
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
