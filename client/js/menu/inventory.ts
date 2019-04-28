import { MenuStyle } from './interfaces';
import { Player } from '../objects/player';
import { InventoryBar } from './inventoryBar';
import { InventoryStats } from './inventoryStats';
import { GameScene } from '../scenes/gameScene';
import { Item } from '../objects/item';

export class Inventory extends Phaser.GameObjects.Container {
  MenuStyle: MenuStyle = {
    font: "bold 32px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle"
  };

  player: Player;

  InventoryList = [];

  inventoryContainer: Phaser.GameObjects.Image;
  currentScene: GameScene;


  constructor(scene: any, x: number, y: number) {
    super(scene, x, y);
    // this.player = player;
    this.currentScene = scene;

    this.setScale(2);
    this.setSize(400, 300);
    this.setAlpha(0.75);
    this.setInteractive();
    // create inventory container that is an IMAGE (not a GameObject Container [should prob rename])
    this.inventoryContainer = this.currentScene.add.image(0, 0, 'inventoryContainer');
    this.inventoryContainer.setScale(3);
    // this.inventoryContainer.setScale(1);
    this.inventoryContainer.setOrigin(0);

    this.add(this.inventoryContainer);

    this.addInventorySlots();
    this.addItemsToInventory();

    // // make object draggable
    scene.input.setDraggable(this);

    // super.add(this.inventory);
    scene.add.existing(this);

    this.handleInput();

    // this.debug();
  }

  addInventorySlots() {
    // todo: refactor into another class
    let row = 0;
    for (let i = 0; i <= 8; i++) {
      const slotPosition = this.getSlotPos(i);
      // add to this container
      this.add(
        this.currentScene.add.rectangle(slotPosition.x, slotPosition.y, 32, 32, 0x6666ff).setOrigin(0, 0)
      );
    }
  }

  addItemsToInventory() {
    // todo: refactor into another class
    Object.keys(this.currentScene.player.items).map((key, i) => {
      const slotPosition = this.getSlotPos(i);
      
      // add this to this container
      this.add(
        new Item({ scene: this.currentScene, ...this.currentScene.player.items[key], x: slotPosition.x, y: slotPosition.y })
      );
    });
  }

  getSlotPos(index) {
    return {
      x: (index % 3) * 48 + 26,
      y: Math.floor(index / 3) * 50 + 50
    }
  }

  destroyInventory() {
    // not sure why but i gotta do all of this
    // this.inventory.destroy();
    this.currentScene.player.inventory = null;
    // this.inventoryBars.destroy(true);
    this.destroy(true);
  }

  handleInput() {
    this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J).once('down', () => {
      this.destroyInventory();
    });

    this.currentScene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      this.x = pointer.x;
      this.y = pointer.y;

    }, this);
  }

  debug() {
    this.bounds1 = this.inventoryContainer.getBounds();
    this.bounds2 = super.getBounds();
    this.graphics = this.currentScene.add.graphics();
    this.graphics.lineStyle(1, 0x0000ff);
    this.graphics.strokeRectShape(this.bounds1);
    this.graphics.lineStyle(1, 0xff0000);
    this.graphics.strokeRectShape(this.bounds2);
  }
}