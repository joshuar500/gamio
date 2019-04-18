module.exports = function (socket, players, io) {
  // when an item is placed into the world, add the item to the player's inventory
  socket.on('worldItemPlaced', function (itemData) {
    if (players[itemData.playerId].worldItemInventory) {
      players[itemData.playerId].worldItemInventory.push(itemData);
    } else {
      players[itemData.playerId].worldItemInventory = [itemData];
    }
    io.emit('worldItemPlacedUpdate', itemData);
  });
}