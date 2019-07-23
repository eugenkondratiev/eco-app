 
class LogQueue {
    
    constructor(){
        // if (!LogQueue.instance){
        //     LogQueue.instance = this;
        //     this.collection =[];
        // }
        // return LogQueue.instance;
        this.collection = [];    
    }

    enqueue(log) {
        this.collection.push(log);
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return (this.collection.length === 0);
    }

    length() {
        return this.collection.length;
    }
    front() {
        return this.collection[0];
    }
}

// const log = new LogQueue();
// Object.freeze(log);

module.exports = LogQueue;