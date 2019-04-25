import { Player } from '../objects/player';

export class InventoryStats extends Phaser.GameObjects.Image {
  player: Player;
  nameText: Phaser.GameObjects.Group;
  valueText: Phaser.GameObjects.Group;
  nameStyle = {
      font: "bold 10px Arial",
      fill: "#fff",
      boundsAlignH: "left",
      boundsAlignV: "middle"
  };
  valueStyle = {
      font: "bold 10px Arial",
      fill: "#fff",
      align: "right",
      boundsAlignH: "right",
      boundsAlignV: "middle"
  };
  constructor(game: any, x: number, y: number, player: Player) {
      super(game, x, y, "inventory");
      this.game = game;
      this.setScale(0.5, 0.5);
      this.player = player;
      this.nameText = this.game.add.group();
      this.valueText = this.game.add.group();
      this.createText();
      // this.addChild(this.nameText);
      // this.addChild(this.valueText);
      // this.nameText.scale.setTo(2, 2);
      // this.valueText.scale.setTo(2, 2);
  }

  createText() {
      let ii = 0;
      const offsetx = 10;
      const offsety = 10;
      for (const key in this.player.stats) {
          ii++;
          const name = this.game.add.text(offsetx, ii * offsety, `${key}`, this.nameStyle);
          this.nameText.add(name);
          const value = this.game.add.text(this.width, ii * offsety, `${this.player.stats[key]}`, this.valueStyle);
          value.x -= value.width + offsetx;
          this.valueText.add(value);
      }
  }

}