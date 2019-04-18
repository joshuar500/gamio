module.exports = function(socket, star) {
  // send the star object to the new player
  socket.emit('starLocation', star);
}