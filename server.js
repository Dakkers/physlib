var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});

app.post('/auth/login', function(req, res) {
    console.log(req);
    res.json({status: 1});
});

app.post('/auth/signup', function(req, res) {
    console.log(req);
    res.json({status: 1});
});

app.listen(4000);