var express = require('express');
var router = express.Router();
const views = require('./abs-routes').views;
const dayReport1 = require('../controllers/model/day-report-eco1');
const dayReport2 = require('../controllers/model/day-report-eco2');

/* GET home page. */
router.use(function( req,res,next) {
  console.log("req.path", req.path);  
  //console.log("req", req);
  next();
});

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' }); 
  console.log(' get day-reports.html');

  res.sendFile('/day-reports.html',{ root : views},(err) => {   
    if (err) {
      console.log(err);
    } else {
      ;
      // console.log(" day-report index is sended");
    }
  });
});

router.get('/:ecoId/', function(req, res, next) {
  //res.render('index', { title: 'Express' }); 
   console.log(' parse route');
  try {
    const eco = parseInt(req.params.ecoId);
    const year = parseInt(req.query.year) || 2019;
    const month = parseInt(req.query.month) || 5;
    const day = parseInt(req.query.day) || 22;

    const dayrep = eco === 2 ? new dayReport2(day, month, year) : new dayReport1(day, month, year);

    dayrep.getDayReport(day, month, year)
    .then(result => {
     // console.log("Eco2 querty result = ", result)
      res.setHeader('content-type', 'text/html');
      res.status(200).send(result);
    })
    .catch(err => {
      const resResponse =  err; 
      resResponse.____tytle = "getDayReport rejected";

      res.setHeader('content-type', 'text/html');
      res.status(200).send(JSON.stringify(resResponse));
    });

  } catch (error) {
    res.status(501);
    console.log(error.message);
    
  }


});

module.exports = router;
