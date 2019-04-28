import { Item } from '../../objects/item';

export function worldObjectPlaced(itemData) {
    new Item({
      scene: this,
      x: itemData.x,
      y: itemData.y,
      frame: itemData.frame,
      key: itemData.key,
      itemData: itemData
    })
}