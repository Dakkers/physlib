var path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server);

app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});

io.on('connection', function(socket) {
	socket.on('update-book', function(data) {
		socket.broadcast.emit('update-book', data);
	});
});

app.post('/auth/login', function(req, res) {
    console.log(req);
    res.json({status: 1});
});

app.post('/auth/signup', function(req, res) {
    console.log(req);
    res.json({status: 1});
});

server.listen(4000);