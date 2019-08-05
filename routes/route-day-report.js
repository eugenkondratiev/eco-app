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
      // console.log(" day-report index is sended");
      
    }
  });
});


{
// router.get('/test', function(req, res, next) {
//   //res.render('index', { title: 'Express' }); 
//    console.log(' the test 1 reached');
//   try {
//     const randomResponse = `<tr> <td>-------</td> <td>=_=_=_=_=_ </td><td>xxxxxx</td><td>${(Math.random() * 100.0).toFixed(3)}</td></tr>`;
//     console.log("randomResponse  " , randomResponse);
    
//     const dayrep = new dayReport1();
//     dayrep.getDayReport()
//     .then(result => {
//      // console.log("Eco1 querty result = ", result)
//       res.setHeader('content-type', 'text/html');
//       res.status(200).send(result);
//     })
//     .catch(err => {
//       console.log("getDayReport rejected :", err);
//       res.setHeader('content-type', 'text/html');
//       res.status(200).send(err);
//     });
//     // res.setHeader('content-type', 'text/html');
//     // res.status(200).send(randomResponse);


//   } catch (error) {
//     res.status(501);
//     console.log(error.message);
    
//   }
  
//   // res.sendFile('/day-reports.html',{ root : views},(err) => {   
//   //   if (err) {
//   //     console.log(err)
//   //   } else {
//   //     console.log(" day-report index is sended");
//   //     console.log("__dirname", __dirname);
      
//   //   }
//   // });

// });
}



router.get('/:ecoId/', function(req, res, next) {
  //res.render('index', { title: 'Express' }); 
   console.log(' parse route');
  try {
    const eco = parseInt(req.params.ecoId);
    const year = parseInt(req.query.year) || 2019;
    const month = parseInt(req.query.month) || 5;
    const day = parseInt(req.query.day) || 22;

    const dayrep = eco === 2 ? new dayReport2(day, month, year) : new dayReport1(day, month, year);
    // console.log(eco, year, month, day);

    dayrep.getDayReport(day, month, year)
    .then(result => {
     // console.log("Eco2 querty result = ", result)
      res.setHeader('content-type', 'text/html');
      res.status(200).send(result);
    })
    .catch(err => {
      const resResponse =  err; 
      resResponse.____tytle = "getDayReport rejected";
      // console.log(resResponse);

      res.setHeader('content-type', 'text/html');
      res.status(200).send(JSON.stringify(resResponse));
    });

  } catch (error) {
    res.status(501);
    console.log(error.message);
    
  }


});

module.exports = router;
