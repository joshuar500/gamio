export function addEvents() {
  
  this.input.on('pointerdown', function (pointer, gameObject) {
    // ability to place items on scene
  }, this);

  this.input.on('gameobjectdown', function (pointer, gameObject) {
    if (gameObject.collectible) {
      gameObject.collectItemData();
    };
  }, this);

  this.input.on('gameobjectover', function (pointer, gameObject) {
    if (gameObject.text) gameObject.text.setVisible(true);
  }, this);

  this.input.on('gameobjectout', function (pointer, gameObject) {
    if (gameObject.text) gameObject.text.setVisible(false);
  }, this);
}