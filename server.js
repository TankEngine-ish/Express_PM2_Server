const express = require('express');
const cluster = require ('cluster');
const os = require('os');

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while(Date.now() - startTime < duration) {
    // event loop is blocked
  }
}

app.get('/', (req, res) => {
  res.send(`Express Server ${process.pid} says hello!`);
});

/* 
The .pid property is used in Node.js to get the process ID of the current process. 
Here, process.pid returns the ID of the current process running the Express server.
The master and worker threads have different pid's.
*/

console.log('Running Server.js...');
app.get('/timer', (req, res) => {
    delay(9000);
    // JSON.stringify(req.query);
    // JSON.parse(req.query);
    // [3, 4, 9, 1, 3]. sort()
    res.send(`Wake UP!${process.pid}`);
});

if (cluster.isMaster) {
    console.log('MASTER has been started!');
    
    cluster.fork();
    cluster.fork(); // 2 workers
} else {
    console.log('WORKER process started!');
    app.listen(3000);
};
