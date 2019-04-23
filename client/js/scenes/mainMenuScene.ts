export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: "MainMenuScene"
    });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.P
    );
    this.startKey.isDown = false;
  }

  create(): void {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 135,
        this.sys.canvas.height / 2 - 80,
        "flappyBirdFont",
        "JOSH'S GAME",
        40
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 115,
        this.sys.canvas.height / 2 - 10,
        "flappyBirdFont",
        "PRESS P TO PLAY",
        25
      )
    );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start("HudScene");
      this.scene.start("GameScene");
      this.scene.bringToTop("HudScene")
    }
  }
}