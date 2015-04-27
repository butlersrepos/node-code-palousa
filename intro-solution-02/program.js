var http = require('http');

var server = http.createServer(function(req, res) {
    console.log("I got a request!");
    res.end("Hello World!");
});

server.listen(8080);