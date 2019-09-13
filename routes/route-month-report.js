var express = require('express');
var router = express.Router();
const views = require('./abs-routes').views;

const monthReport1 = require('../controllers/model/month-report-eco1');
const monthReport2 = require('../controllers/model/month-report-eco2');


/* GET home page. */
router.use(function( req,res,next) {
  console.log("month-reports req.path", req.path);  
  // console.log("req", req);
  next();
});

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' }); 
  console.log(' get index.html');

  res.sendFile('/month-reports.html',{ root : views},(err) => {   
    if (err) {
      console.log(err)
    } else {
      console.log(" month-report index is sended");
      console.log("__dirname", __dirname);
      
    }
  });
});

router.get('/:ecoId/', function(req, res, next) {
  //res.render('index', { title: 'Express' }); 
   console.log(' parse route');
  try {
    const eco = parseInt(req.params.ecoId);
    const year = parseInt(req.query.year) || 2019;
    const month = parseInt(req.query.month) || 9;


    // const monthrep =  new monthReport1(month, year);
    
    // const monthrep = eco === 2 ? new monthReport2(month, year) : new monthReport1(month, year);
     console.log("PARAMS = ", eco, year, month);
    const monthrep = eco === 2 ? new monthReport2( month, year) : new monthReport1(month, year);

    monthrep.getMonthReport(month, year)
    .then(result => {
     console.log("Eco2 query result = ", result);
      res.setHeader('content-type', 'text/html');
      res.status(200).send(result);
    })
    .catch(err => {
      const resResponse =  err; 
      resResponse.____tytle = "getMonthReport rejected";
      console.log("resResponse ", resResponse  );
      res.setHeader('content-type', 'text/html');
      res.status(200).send(JSON.stringify(resResponse));
    });


  } catch (error) {
    res.status(501);
    console.log(error.message);
    
  }


});
//=============================================================================================
router.get('/test', function(req, res, next) {
  //res.render('index', { title: 'Express' }); 
  // console.log(' get index.html');
  try {
    const randomResponse = `<tr> <td>--2019---</td> <td>MONTH </td><td>xxxxxx</td><td>${(Math.random() * 100.0).toFixed(3)}</td></tr>`;
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
  //-0------------------------------------------------------------------------------
});


module.exports = router;
