import { ItemSlot } from './interfaces';
import { Player } from '../objects/player';

export class InventoryBar extends Phaser.GameObjects.Image {

  player: Player;

  slots = {
      type: 0,
      amount: 0,
      array: [],
  };

  itemSlot: Phaser.GameObjects.Group;
  equiptSlot: Phaser.GameObjects.Group;
  game: any;
  container: any;

  constructor(game: any, x: number, y: number, player: Player, slotType: number, amount: number) {
      super(game, x, y, "inventorybar");
      this.game = game;
      this.setScale(0.5, 0.5);
      this.player = player;
      this.slots = {
          type: slotType,
          amount: amount,
          array: [],
      };
      this.itemSlot = this.game.add.group();
      this.equiptSlot = this.game.add.group();
      this.addSlots(this.slots.array, amount);

      // this.addChild(this.itemSlot);
      // this.itemSlot.setScale(2, 2);

      // this.addChild(this.equiptSlot);
      // this.equiptSlot.setScale(2, 2);

      // this.container = this.game.add.container(400, 200);
      // this.container.add(this.itemSlot);
      // this.container.add(this.equiptSlot);
      // this.container.setSize(2, 2);

      // this.game.physics.world.enable(this.container);
      // this.destroy();
  }

  addSlots(obj: Array<ItemSlot>, amount: number) {
      for (let ii = 0; ii < amount; ii++) {
          const image = this.game.add.image(0, 0, "star");
          obj.push({
              backgroundImage: image,
              item: this.player.equipment.getEquiptItem(this.slots.type, ii),
              itemImage: null,
              trigger: () => {
                  console.log("hi");
              }
          });
          image.x += ii * (image.width + 20) + 10;
          image.y += image.height / 3;
          image.inputEnabled = true;
          if (obj[ii].item) {
              obj[ii].itemImage = this.game.add.image(image.x, image.y, "star");
              obj[ii].itemImage!.width = image.width;
              obj[ii].itemImage!.height = image.height;
              // obj[ii].itemImage!.events.onInputOver.add(this.showToolTip, this);
              // obj[ii].itemImage!.events.onInputOut.add(this.hideToolTip, this);
              this.equiptSlot.add(obj[ii].itemImage);
          }
          // console.log('image', image);
          // TODO: implement add this trigger
          //image.events.onInputUp.add(obj[ii].trigger, this);
          this.itemSlot.add(image);
      }
  }

  showToolTip() {

  }

  hideToolTip() {

  }
}