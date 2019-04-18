module.exports =  function(socket, scores) {
  // send the current scores
  socket.emit('scoreUpdate', scores);
};
