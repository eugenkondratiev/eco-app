const dtUtils = require('./date-utils');

module.exports = getHtmlFile;

//==============================================================================
//===============================================================================
function getHtmlFile(htmlArr, reportDay = 20, reportMonth = 1, reportYear = 2019, eco = 1, type = 1) {
    const title = type === 2 // month report;
                    ? `Oтчет за ${dtUtils.monthName(reportMonth)} ${reportYear}`
                    : `Oтчет за ${reportDay} ${dtUtils.monthString(reportMonth)} ${reportYear}`;

    const htmlStart =`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${title}</title>
        <link rel="stylesheet" href="css/mainsheet.css">
        <style>
        #monthTable {
          border: 1px solid darkgrey;
          margin: auto ;
          align-content: center;
      }
      #monthTable td, th {
          border: 1px solid grey;
          padding: 2px;
          text-align: center;
      }  
      #reportDiv {
          margin: auto;
          align-content: center
      }
      #monthTable tr:nth-child(even) {
          background-color: rgb(231, 231, 231);
      }
      #monthTable tr:hover {
           background-color:darkkhaki;
      }
      #monthTable tr:nth-last-child() {
          background-color: grey;
          font-style: italic;
          font-size: 1.5em
      }
      #monthTable th {
          border: 1px solid grey;
          padding-top: 5px;
          padding-bottom: 5px;
          background-color: darkcyan;
          color: rgb(245, 245, 245);
      } 
      h1 {
          text-align: center;
      }
        </style>
      
    </head>
    <h1>${title}</h1>
    <body><div style="height:10px"></div><div id="reportDiv"><table id="monthTable">`;
    
    const htmlEnd = `
        </table>
    </div>
    
    </body>
    </html>`;
    
    return htmlStart + htmlArr + htmlEnd;
};

