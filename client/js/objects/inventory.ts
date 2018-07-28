export class Inventory extends Phaser.GameObjects.Sprite {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // image
    this.setScale(1);
    this.setOrigin(0, 0);
    this.setInteractive();

    // physics
    params.scene.physics.world.enable(this);

    // now that physics has been added,
    // we can update the physics body
    this.body.setSize(32, 32);

    // add to scene
    params.scene.add.existing(this);

    // make object draggable
    params.scene.input.setDraggable(this);

    params.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = pointer.x;
        gameObject.y = pointer.y;

    });


    params.scene.input.keyboard.on('keyup_I', function (event) {
      this.setVisible(!this.visible);
    }, this);
  }
}