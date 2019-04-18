import { Inventory } from '../../objects/inventory';

export function addInventory() {
  return new Inventory({
    scene: this,
    x: 0,
    y: 0,
    key: 'inventoryContainer'
  });
}