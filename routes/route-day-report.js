var express = require('express');
var router = express.Router();
const views = require('./abs-routes').views;

/* GET home page. */
router.use(function( req,res,next) {
  console.log("req.path", req.path);  
  //console.log("req", req);
  next();
});

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' }); 
  console.log(' get index.html');

  res.sendFile('/day-reports.html',{ root : views},(err) => {   
    if (err) {
      console.log(err)
    } else {
      console.log(" day-report index is sended");
      console.log("__dirname", __dirname);
      
    }
  });
});



router.get('/test', function(req, res, next) {
  //res.render('index', { title: 'Express' }); 
  // console.log(' get index.html');
  try {
    const randomResponse = `<tr> <td>-------</td> <td>=_=_=_=_=_ </td><td>xxxxxx</td><td>${(Math.random() * 100.0).toFixed(3)}</td></tr>`;
    // console.log("randomResponse  " , randomResponse);
    
  res.setHeader('content-type', 'text/html');
  res.status(200).send(randomResponse);

  } catch (error) {
    console.log(error.message);
    
  }
  
  // res.sendFile('/day-reports.html',{ root : views},(err) => {   
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log(" day-report index is sended");
  //     console.log("__dirname", __dirname);
      
  //   }
  // });

});


module.exports = router;
