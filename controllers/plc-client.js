     var TcpPort = require("modbus-serial").TcpPort;
     var tcpPort = new TcpPort("192.168.1.225");
     var ModbusRTU = require("modbus-serial");

     function createm340client() {

         let client = new ModbusRTU(tcpPort);

         const bits = require('./bit-operations');
         bits.addBinFunctions();
         client.connectTCP("192.168.1.225", {
             port: 502
         }).then(() => {
             client.setID(1);
         }).catch((err) => console.error("192.168.1.225 connect problem \n ", err));
         // client.connectTCP("95.158.47.15", { port: 502 });
         //client.connectTCP(tcpPort, { port: 502 });

         return client;
     }

     let m340client = undefined;

     function getM340() {
         if (!m340client) m340client = createm340client();
         return m340client;
     }


     module.exports = getM340;