export class Player extends Phaser.GameObjects.Sprite {
  private currentScene: Phaser.Scene;
  private timeElapsed: number;
  private velocity: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.currentScene = params.scene;

    this.timeElapsed = 0;
    this.velocity = 500;

    this.setOrigin(0.5, 0.5); // TODO: change to constants
    this.setDisplaySize(53, 40); // TODO: change to constants
    this.setSize(53, 40); // TODO: change to constants

    if (params.playerInfo.team === 'blue') {
      this.setTint(0x0000ff);
    } else {
      this.setTint(0xff0000);
    }

    // enable player physics properties so we can move/collide
    params.scene.physics.world.enable(this);
    params.scene.add.existing(this);

    // add ability to collide with a colliding layer
    params.scene.physics.add.collider(this, params.scene.collidingLayer);

    // add map bounds and camera follows player
    params.scene.cameras.main.startFollow(this);
    params.scene.cameras.main.setBounds(0, 0, params.scene.map.widthInPixels, params.scene.map.heightInPixels);
  }

  update(time, delta) : void {

    // control the player with keyboard
    if (this) {
      let animDir = "";
      let madeAMove = false;
      this.timeElapsed += delta;
      // if (this.timeElapsed > 2000) {
      //   console.log('this.player', this);
      //   this.timeElapsed = 0;
      // }
      if (this.currentScene.keys.up.isDown) {
        this.currentScene.player.body.setVelocity(0, -this.velocity);
        madeAMove = true;
        animDir = "up";
      } else if (this.currentScene.keys.right.isDown) {
        this.body.setVelocity(this.velocity, 0);
        madeAMove = true;
        animDir = "right";
      } else if (this.currentScene.keys.down.isDown) {
        this.body.setVelocity(0, this.velocity);
        madeAMove = true;
        animDir = "down";
      } else if (this.currentScene.keys.left.isDown) {
        this.body.setVelocity(-this.velocity, 0);
        madeAMove = true;
        animDir = "left";
      } else {
        this.body.setVelocity(0, 0);
      }
    }

    this.updateMultiplayer();
  }

  updateMultiplayer() : void {
    // update other connected players of this player's position
    // by emitting player position through websocket
    const x = this.x;
    const y = this.y;
    const r = this.rotation;
    if (this.oldPosition && (x !== this.oldPosition.x || y !== this.oldPosition.y || r !== this.oldPosition.rotation)) {
        this.currentScene.socket.emit('playerMovement', { x: this.x, y: this.y, rotation: this.rotation });
    }
    
    // save old position data
    this.oldPosition = {
        x: this.x,
        y: this.y,
        rotation: this.rotation
    };
  }
}