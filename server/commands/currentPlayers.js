module.exports = function(socket, players) {
  // send the players object to the new player
  socket.emit('currentPlayers', players);
}