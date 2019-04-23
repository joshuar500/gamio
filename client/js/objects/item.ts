export class Item extends Phaser.GameObjects.Sprite {

  private currentScene: any;
  private text: any;
  private itemData : object;
  private collectible: boolean;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.currentScene = params.scene;
    // this.currentScene.items = this.currentScene.add.group({ runChildUpdate: true });
    this.itemData = params.itemData ? params.itemData : null;
    this.collectible = false;
    this.text = null;

    // image
    this.setScale(1);
    this.setOrigin(0, 0);

    // physics
    params.scene.physics.world.enable(this);
    this.body.setSize(32, 32);

    if (this.itemData) {
      this.setData(this.itemData);
      this.setInteractive();
      this.addItemData(params.itemData);
      this.collectible = true;
    }
    // add to scene
    params.scene.add.existing(this);
  }

  addItemData = (itemData) => {
    this.text = this.currentScene.add.text(this.x + this.width, this.y, '', { font: '16px Courier', fill: '#000000' });
    this.text.setText([
      'Name: ' + this.getData('name'),
      'Level: ' + this.getData('level'),
      'Value: ' + this.getData('value') + ' monies',
      'Owner: ' + this.getData('playerId'),
      'Date: ' + new Date().getTime().toString()
    ]);
    this.text.setVisible(false);
  }

  public collectItemData() {
    // TODO: implement
    this.text.setVisible(false);
    this.text.destroy(true);
    this.setVisible(false);
    this.destroy(true);
  }
}