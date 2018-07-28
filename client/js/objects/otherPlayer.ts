export class OtherPlayer extends Phaser.GameObjects.Sprite {
  public playerId: any;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.setOrigin(0.5, 0.5);
    this.setDisplaySize(53, 40);

    if (params.playerInfo.team === 'blue') {
      this.setTint(0x0000ff);
    } else {
      this.setTint(0xff0000);
    }

    this.playerId = params.playerInfo.playerId;

    params.scene.add.existing(this);
  }
}