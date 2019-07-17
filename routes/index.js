var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(function( req,res,next) {
  console.log("req.path", req.path);  
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

module.exports = router;
