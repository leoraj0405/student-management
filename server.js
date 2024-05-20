var express = require('express');
var server = express();
var PORT = 2500;
server.set('view engine', 'ejs');

server.get('/', function(req, res) {
  res.render('pages/form');
});

server.get('/facebook', function(req, res) {
  res.render('pages/facebook');
});

server.listen(PORT);

console.log(`Server is listening on port ${PORT}`);