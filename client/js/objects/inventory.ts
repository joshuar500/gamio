export class Inventory extends Phaser.GameObjects.Sprite {

  private inventory: any;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // image
    this.setScale(5);
    this.setOrigin(0, 0);
    this.setInteractive();
    this.setName('Inventory');

    // physics?
    params.scene.physics.world.enable(this);

    // now that physics has been added,
    // we can update the physics body

    // add to scene
    params.scene.add.existing(this);

    // make object draggable
    params.scene.input.setDraggable(this);

    params.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = pointer.x;
        gameObject.y = pointer.y;

    });

    this.setVisible(false);


    params.scene.input.keyboard.on('keyup_I', function (event) {
      this.setVisible(!this.visible);
    }, this);
  }
}