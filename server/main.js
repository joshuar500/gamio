var Bundler = require('parcel-bundler');
var express = require('express');
var app = express();

if (app.get('env') == 'development') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  })
}

var server = require('http').Server(app);
var io = require('socket.io').listen(server, { path: '/socketio' });

const indexHtml = './client/index.html';
const options = {};
const bundler = new Bundler(indexHtml, options);
 
var players = {};
var star = {
  x: Math.floor(Math.random() * 700) + 50,
  y: Math.floor(Math.random() * 500) + 50
};
var scores = {
  blue: 0,
  red: 0
};
 
app.use(express.static('public'));
app.use(bundler.middleware());
 
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: './dist' });
});
 
io.on('connection', function (socket) {
  console.log('a user connected');
  
  require('./commands/scoreUpdate')(socket, scores);
  require('./commands/createPlayer')(socket, players);
  require('./commands/currentPlayers')(socket, players);
  require('./commands/newPlayer')(socket, players);
  require('./commands/starLocation')(socket, star);
  require('./commands/playerMovement')(socket, players);
  require('./commands/starCollected')(socket, players, star, scores, io);
  require('./commands/worldItemPlaces')(socket, players, io);
  require('./commands/disconnect')(socket, players, io);
  
});
 
server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});