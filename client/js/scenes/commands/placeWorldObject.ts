import { Item } from '../../objects/item';

export function placeWorldObject() {
  // TODO: if item is selected and item is not over any obstacles (inventory, dialog, house, tree, etc)
  const currentScene = this;
  this.input.on('pointerdown', function (pointer) {

    const itemData = {
      playerId: this.player.playerInfo.playerId,
      type: 'flower',
      name: 'cool flower',
      level: 0,
      owner: 'playerId1234',
      value: 12
    }
    new Item({
      scene: this,
      x: this.marker.snappedWorldPoint.x,
      y: this.marker.snappedWorldPoint.y,
      frame: 39,
      key: "desert_sprites",
      itemData: itemData
    });
    // const tile = this.map.groundLayer.putTileAtWorldXY(6, this.marker.snappedWorldPoint.x, this.marker.snappedWorldPoint.y);
    // tile.setCollision(true);
    this.socket.emit('worldItemPlaced', { ...itemData, x: this.marker.snappedWorldPoint.x, y: this.marker.snappedWorldPoint.y });
  }, this);
  
  this.socket.on('worldItemPlacedUpdate', function(itemData) {
    new Item({
      scene: currentScene,
      x: itemData.x,
      y: itemData.y,
      frame: 39,
      key: "desert_sprites",
      itemData: itemData
    })
  });
}