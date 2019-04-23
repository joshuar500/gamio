export class HudScene extends Phaser.Scene {
  private stats: any;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: 'HudScene'
    });
  }

  init(): void {
  }

  create(): void {

    //  Grab a reference to the Game Scene
    // let ourGame = this.scene.get('GameScene');
    
    // add stats
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width - 305,
        10,
        "flappyBirdFont",
        "player one",
        40
      )
    );
  }

  update() {
  }

  debug() {
  }

}
