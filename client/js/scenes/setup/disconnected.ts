export function disconnected(playerId) {
  this.otherPlayers.getChildren().forEach(function (otherPlayer) {
    if (playerId === otherPlayer.playerId) {
      otherPlayer.destroy();
    }
  });
}