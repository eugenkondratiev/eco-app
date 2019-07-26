const mysql = require('mysql');

let con;


  function getCon() {
    if (con === undefined  || con.state === "disconnected") {
        con =  mysql.createConnection({
          host: "95.158.47.15",
          user: "asu",
          password: "0506233236",
          database: "eco",
          multipleStatements: true
        });
        con.____id = Math.random();
        console.log(con.____id, "      " , con.state);

        return con;
    } else {
      console.log(con.____id, "   existed    " , con.state); 
      return con;
    }

  }


  module.exports = getCon;
  