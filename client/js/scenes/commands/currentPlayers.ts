export function currentPlayers(players) {
  const { socket, addPlayer, addOtherPlayers } = this;
  Object.keys(players).forEach(function (id) {
    if (players[id].playerId === socket.id) {
      addPlayer(players[id]);
    } else {
      addOtherPlayers(players[id]);
    }
  });
}