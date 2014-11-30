"use strict";

var path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    mongoose = require('mongoose'),
    jwt = require('jwt-simple'),
    moment = require('moment');

// CONFIG =====================================================
var config = require('./app/config'),
    User = require('./app/models/user');
mongoose.connect(config.MONGO_URI);
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.SUPER_SECRET_TOKEN);
}


// ROUTING ====================================================
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
    console.log(req.body);
    User.findOne({email: req.body.email}, function(err, existingUser) {
        if (err)
            return;
        // email is already in use
        if (existingUser)
            return res.status(409).send({alert: 'That email is already in use. Sorry.'});

        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            uwid: req.body.uwid,
            name: req.body.name,

            booksSignedOut: [],
            booksRequested: []
        });

        newUser.save(function(err) {
            if (err)
                return;
            res.send({token: createToken(newUser)});
        });

    });
    // console.log(req);
    // res.json({status: 1});
});

server.listen(4000);