import { MenuStyle } from './interfaces';
import { Player } from '../objects/player';
import { InventoryBar } from './inventoryBar';
import { InventoryStats } from './inventoryStats';

export class Inventory extends Phaser.GameObjects.Container {
  MenuStyle: MenuStyle = {
    font: "bold 32px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle"
  };

  player: Player;

  InventoryList = [];

  inventoryBars: Phaser.GameObjects.Group;

  inventoryStats: Phaser.GameObjects.Group;

  constructor(scene: any, x: number, y: number, children: any) {
    super(scene, x, y, children);
    // this.player = player;
    this.currentScene = scene;
    this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J).once('down', () => {
      this.destroyInventory();
    });

    // this.game.add.image({ key: 'inventoryContainer' });
    this.inventory = this.currentScene.add.sprite(200, 300, 'inventoryContainer');
    this.inventoryBars = this.currentScene.add.group({ key: 'star', frame: 0, repeat: 50, setScale: { x: 0.5, y: 0.5 } });
    Phaser.Actions.GridAlign(this.inventoryBars.getChildren(), { width: 9, cellWidth: 58, cellHeight: 48, x: 132, y: 148 });

    this.setScale(5);
    this.setSize(300, 400);
    // this.setOrigin(0, 0);
    this.setInteractive();

    this.currentScene.physics.world.enable(this);

    // add to scene
    this.currentScene.add.existing(this);

    // make object draggable
    scene.input.setDraggable(this);

    scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

      gameObject.x = pointer.x;
      gameObject.y = pointer.y;

    });

    // const bar1 = new InventoryBar(this.game, this.x, this.y, this.player, "armor", 4);
    // const bar2 = new InventoryBar(this.game, bar1.x, bar1.y + bar1.height, this.player, "ring", 4);
    // const bar3 = new InventoryBar(this.game, bar2.x, bar2.y + bar2.height, this.player, "belt", 4);
    // const bar4 = new InventoryBar(this.game, bar2.x, bar3.y + bar3.height, this.player, "belt", 4);
    // this.inventoryBars.add(bar1);
    // this.inventoryBars.add(bar2);
    // this.inventoryBars.add(bar3);
    // this.inventoryBars.add(bar4);

    // this.inventoryStats = this.game.add.group();
    // const stats = new InventoryStats(this.game, bar1.x + bar1.width, bar1.y, this.player);
    // this.inventoryStats.add(stats);
    // console.log('this.inventoryBars', this.inventoryBars);
  }

  destroyInventory() {
    // not sure why but i gotta do all of this
    this.currentScene.player.inventory = null;
    this.inventoryBars.destroy(true);
    this.destroy(true);
    console.log('this.game', this.currentScene);
  }
}