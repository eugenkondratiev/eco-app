const LOG_PATH = "D:/nodejs/Logs/";
const fs = require('fs');
const qu = require('./log-queue');

class FileLogger {
    constructor(_logpath, _interval) {
        this.logPath = _logpath || LOG_PATH;
        this.interval = _interval || 5000;
        this.logs = new qu();
        console.log("isEmpty %d", this.logs.isEmpty());

        this.handler = setInterval(this.logPeriodically.bind(this), this.interval);
    }

    stopPeriodicLogging () {
        clearInterval(this.handler);
    }

    logPeriodically() {
        if (this.logs.isEmpty()) {
            console.log('Nothing to log now');
            return;           
        }
        const dt = new Date();
        const logName = dt.toLocaleString().slice(0, -9);
        const logFile = this.logPath + logName + ".log";
        console.log(dt.toISOString, "  ", this.logs);
        let ws;
        try {
            ws = fs.createWriteStream(logFile, {
                    flags: "a", 
                    encoding:'utf8',
                    mode: 0o644, 
                    autoClose: true
                    });
            ws.on('open',()=> {
                while (!this.logs.isEmpty()) {
                    try{let msg = this.logs.dequeue();
                        // console.log(`msg  to ${logFile} :  ${msg}`);
                        
                        ws.write(msg, 'utf8', (err) => {
                            if (err) { console.log(err.message);
                                
                            }
                            if (this.logs.isEmpty()) {
                                // console.log(`need to end stream here`);                                    
                                ws.close();
                            }
                        }) ;
                    } catch (error){
                        console.log("fs error", error.message);
                    }
                }
            });
            ws.on('close', () => { 
                console.log('ws closed');
            })
        } catch (error) {
            console.log(error.message);
        } finally {
            ;
        }
        // old version.....
        // while (!this.logs.isEmpty()) {
        // try{
        //     fs.appendFile(logFile, this.logs.dequeue(), (err) => {
        //         if (err) { console.log(err.message);
        //         }
        //     }) ;
        // } catch (error){
        //     console.log("fs error", error.message);
        // }
        
    // }
    //  return;
    };
    
    logIt(data) {
        const dt = new Date();
        const message  = "\r\n-" + dt.toISOString() + "-" + data;    
        console.log(dt.toISOString() + "-" + data);        
        try{
            this.logs.enqueue(message);
        } catch (error) {
            console.log("logQueue error : ", error.message);
        }
            
    }
}

module.exports = FileLogger;
