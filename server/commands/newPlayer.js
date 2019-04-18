module.exports = function(socket, players) {
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);
}