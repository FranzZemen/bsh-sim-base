const cluster = require('cluster');
// NOTE:  Can alter numCPUs to overload a smaller number of cpus
const numCPUs = require('os').cpus().length;
const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');

var simpleRouting =  require('./simplerouting');

var app = express();

// Send everything to simpleRouting OR by path prefix for various routing paths...wwe do everything here
app.use('/', simpleRouting);

var port = 80;
var securePort = 443;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ${worker.process.pid} died');
  });
} else {
// For http
  const httpServer = http.createServer(app);

// For https
// You will need .pem or .pfx files...
// For full secure options See https://nodejs.org/dist/latest-v4.x/docs/api/tls.html#tls_tls_createserver_options_secureconnectionlistener

   const options = {
   key : fs.readFileSync('path/to/key.pem'),
   cert: fs.readFileSync('path/to/cert.pem'),

   // This is necessary only if using the client certificate authentication.
   requestCert: true,

   // This is necessary only if the client uses the self-signed certificate.
   ca: [fs.readFileSync('path/to/client-cert.pem')]
   };

// OR
//const options = {
//  pfx : fs.readFileSync('path/to/pfx.pfx'),

// This is necessary only if using the client certificate authentication.
// requestCert: true,
//};

   const httpsServer = https.createServer(options, app);

  httpServer.listen(port, function () {
    // You can use bunyan as an alternative logging system.
    console.log('http server listening on port ' + port);
  });

   httpsServer.listen(securePort, function () {
   console.log('https server listening on port ' + securePort);
   });
  
}









