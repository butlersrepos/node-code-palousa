var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function (req, res) {
	var urlPieces = url.parse(req.url);

	switch (urlPieces.pathname) {
		case '/hello':
			res.write("Hello World!");
			break;
		case '/file':
			var data = fs.readFileSync(__dirname + '/myResponse.txt', {encoding: 'UTF-8'});
			res.write(data);
			break;
		default:
			res.write("You've reached a deadend!");
			break;
	}
	res.end("\nThanks for visiting!");
});

server.listen(8080);