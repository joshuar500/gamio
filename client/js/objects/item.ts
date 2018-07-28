export class Item extends Phaser.GameObjects.Sprite {

  private text: any;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.currentScene = params.scene;
    this.text = null;

    // image
    this.setScale(1);
    this.setOrigin(0, 0);

    // physics
    params.scene.physics.world.enable(this);
    this.body.setSize(32, 32);

    // add to scene
    params.scene.add.existing(this);

    if (params.itemData) {
      this.setData({ name: 'Red Gem Stone', level: 2, owner: 'Link', 'gold': 50 });
      this.setInteractive();
      this.addItemData(params.itemData);
      this.addItemInputHandler();
    }
  }

  addItemData = (itemData) => {
    this.text = this.currentScene.add.text(this.x + this.width, this.y, '', { font: '16px Courier', fill: '#000000' });
    this.text.setText([
      'Name: ' + this.getData('name'),
      'Level: ' + this.getData('level'),
      'Value: ' + this.getData('gold') + ' gold',
      'Owner: ' + this.getData('owner')
    ]);
    this.text.setVisible(false);
  }

  addItemInputHandler = () => {
    this.currentScene.input.on('gameobjectover', function (pointer, gameObject) {
      if (gameObject.text) gameObject.text.setVisible(true);
    }, this);
    this.currentScene.input.on('gameobjectout', function (pointer, gameObject) {
      if (gameObject.text) gameObject.text.setVisible(false);
    }, this);
  }
}