import { Item } from '../../objects/item';

export function worldObjectPlaced(itemData) {
    new Item({
      scene: this,
      x: itemData.x,
      y: itemData.y,
      frame: 39,
      key: "desert_sprites",
      itemData: itemData
    })
}