export function starLocation(starLocation) {
  const { socket, player, physics } = this;

  if (this.star) this.star.destroy();
  this.star = physics.add.image(starLocation.x, starLocation.y, 'star');
  physics.add.overlap(player, this.star, function () {
    socket.emit('starCollected');
  }, null, this);
}