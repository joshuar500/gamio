export class Marker extends Phaser.GameObjects.Graphics {

  private currentScene: Phaser.Scene;
  private mapTileWidth: number;
  private mapTileHeight: number;
  private layerToSnap: object;
  
  public snappedWorldPoint: object;

  constructor(params) {
    super(params.scene);

    this.currentScene = params.scene;
    this.mapTileWidth = params.mapTileWidth;
    this.mapTileHeight = params.mapTileHeight;
    this.layerToSnap = params.layerToSnap;
    this.snappedWorldPoint = { x: null, y: null };

    this.lineStyle(5, 0xffffff, 1);
    this.strokeRect(0, 0, params.mapTileWidth, params.mapTileHeight);
    this.lineStyle(3, 0xff4f78, 1);
    this.strokeRect(0, 0, params.mapTileWidth, params.mapTileHeight);

    // add to scene
    params.scene.add.existing(this);
  }

  update(): void {
    if (this) {
      const distanceBetweenPlayerAndMarker = Math.sqrt( Math.pow((this.currentScene.player.x - this.x),2) + Math.pow((this.currentScene.player.y-this.y), 2));
      if (distanceBetweenPlayerAndMarker < 150) {
        this.lineStyle(3, 0x00e600, 1);
        this.strokeRect(0, 0, this.mapTileWidth, this.mapTileHeight);
      } else {
        this.lineStyle(3, 0xff4f78, 1);
        this.strokeRect(0, 0, this.mapTileWidth, this.mapTileHeight);
      }

      const worldPoint = this.currentScene.input.activePointer.positionToCamera(this.currentScene.cameras.main);
      const pointerTileXY = this.layerToSnap.worldToTileXY(worldPoint.x, worldPoint.y);
      this.snappedWorldPoint = this.layerToSnap.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
      this.setPosition(this.snappedWorldPoint.x, this.snappedWorldPoint.y);
    }
  }
}