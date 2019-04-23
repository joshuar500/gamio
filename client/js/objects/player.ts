import { Item } from "./item";

export class Player extends Phaser.GameObjects.Sprite {
  private currentScene: Phaser.Scene;
  private timeElapsed: number;
  private velocity: number;
  public playerInfo: any;
  private currentDir: string;
  private items: Phaser.GameObjects.Group;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.currentScene = params.scene;
    this.playerInfo = params.playerInfo;

    this.timeElapsed = 0;
    this.velocity = 200;

    this.setOrigin(0.5, 0.5); // TODO: change to constants
    this.setDisplaySize(53, 40); // TODO: change to constants
    this.setSize(53, 40); // TODO: change to constants
    this.setFlipX(false);

    // // TODO: instead of coloring the sprite, add a name above + team color
    // if (params.playerInfo.team === 'blue') {
    //   this.setTint(0x0000ff);
    // } else {
    //   this.setTint(0xff0000);
    // }

    this.items = this.currentScene.add.group({ runChildUpdate: true });
    this.currentScene.input.on('pointerdown', this.addItem, this);

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
      // todo: refactor better animations pattern?
      let animDir = "idle";
      this.timeElapsed += delta;
      // if (this.timeElapsed > 2000) {
      //   this.timeElapsed = 0;
      // }
      if (this.currentScene.keys.up.isDown) {
        this.currentScene.player.body.setVelocity(0, -this.velocity);
        animDir = "walk_up";
      } else if (this.currentScene.keys.right.isDown) {
        this.body.setVelocity(this.velocity, 0);
        animDir = "walk_left";
        this.setFlipX(true);
      } else if (this.currentScene.keys.down.isDown) {
        this.body.setVelocity(0, this.velocity);
        animDir = "walk_down";
      } else if (this.currentScene.keys.left.isDown) {
        this.body.setVelocity(-this.velocity, 0);
        animDir = "walk_left";
        this.setFlipX(false);
      } else {
        this.body.setVelocity(0, 0);
        this.anims.stop();
      }

      this.handleAnimations(animDir);

    }
    this.updateMultiplayer();
  }

  handleAnimations(animDir: string) : void {
    if (this.currentDir !== animDir) {
      this.currentDir = animDir;
      this.anims.play(animDir);
    }
  }

  addItem(pointer) : void {
    if (!pointer.rightButtonDown()) {
      const itemData = {
        playerId: this.currentScene.player.playerInfo.playerId,
        type: 'flower',
        name: 'cool flower',
        level: 0,
        owner: 'playerId1234',
        value: 12
      }
      // const item = new Item({
      //   scene: this.currentScene,
      //   x: this.currentScene.marker.snappedWorldPoint.x,
      //   y: this.currentScene.marker.snappedWorldPoint.y,
      //   frame: 39,
      //   key: "desert_sprites",
      //   itemData: itemData
      // })
      // this.items.add(item);
      this.currentScene.socket.emit('worldItemPlaced', { ...itemData, x: this.currentScene.marker.snappedWorldPoint.x, y: this.currentScene.marker.snappedWorldPoint.y });
    }
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