/**
 * New node file
 */
var app = require('http').createServer(handler).listen(8080)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

function handler(req, res){
   fs.readFile(__dirname + '/index.html', function (err, data) {
     if (err) {
       res.writeHead(500);
       return res.end('Error loading index.html');
     }

     res.writeHead(200, { 'Content-Type': 'text/html'});
     res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
	socket.on('message', function(message) {
		io.sockets.emit('message', message);
	});
});