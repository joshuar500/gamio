import { Player } from '../objects/player';
// import { Inventory } from '../objects/inventory';
import { Marker } from '../objects/marker';

import { addOtherPlayers, addPlayer, currentPlayers, disconnected,
         addEvents, playerMoved, scoreUpdate, starLocation,
         addInventory, worldObjectPlaced } from './setup/index';

const io = require('socket.io-client');

export class GameScene extends Phaser.Scene {
  private socket: SocketIOClient.Emitter;
  private player: Player;
  private map: Phaser.Tilemaps.Tilemap;
  private groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private collidingLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private marker: Marker;
  private controls: Phaser.Cameras.Controls.FixedKeyControl;
  private velocity: number;
  private otherPlayers: Phaser.Physics.Arcade.Group;
  // private items: Phaser.GameObjects.Group;
  private cursors: any;
  private blueScoreText: any;
  private redScoreText: any;
  private stats: any;
  // private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  private currentPlayers: any;
  private addOtherPlayers: any;
  private addPlayer: any;
  private disconnected: any;
  private addEvents: any;
  private playerMoved: any;
  private scoreUpdate: any;
  private starLocation: any;
  private addInventory: any;
  private worldObjectPlaced: any;
  private keys: any;

  constructor() {
    super({
      key: 'GameScene'
    });
    this.addOtherPlayers = addOtherPlayers.bind(this);
    this.addPlayer = addPlayer.bind(this);
    this.currentPlayers = currentPlayers.bind(this);
    this.disconnected = disconnected.bind(this);
    this.addInventory = addInventory.bind(this);
    this.addEvents = addEvents.bind(this);
    this.playerMoved = playerMoved.bind(this);
    // this.scoreUpdate = scoreUpdate.bind(this);
    this.starLocation = starLocation.bind(this);
    this.worldObjectPlaced = worldObjectPlaced.bind(this);
  }

  init(): void {
    this.socket = io(window.location.href, { path: '/socketio' });
    this.player = null;
  }

  create(): void {
    // disable context menu right click
    this.input.mouse.disableContextMenu();

    // create map
    this.createMap();

    // add network players
    this.otherPlayers = this.physics.add.group();

    // add support for keyboard pressing
    this.cursors = this.input.keyboard.createCursorKeys();

    // add scoreboard
    // this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });
    // this.redScoreText = this.add.text(584, 16, '', { fontSize: '32px', fill: '#FF0000' });

    // add controls
    this.addControls();
    this.addKeys();
    this.addMarker();
    this.addSockets();

    // add inventory TODO: move to player.ts
    this.addInventory();

    // add events
    this.addEvents();

    // debug stuff
    this.debug();
  }

  update(time, delta) {
    this.controls.update(delta);

    if (this.player) {
      // update player position
      this.player.update(time, delta);

      // update marker position
      this.marker.update();
    }
  }

  debug() {
    this.debugGraphics = this.add.graphics().setAlpha(0.75);

    // this.collidingLayer.renderDebug(this.debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // });
  }

  createMap() {
    this.map = this.make.tilemap({ key: 'rpg-map' });
    const tiles = this.map.addTilesetImage('atlas', 'map-tiles');
    this.map.groundLayer = this.map.createDynamicLayer('Ground', tiles, 0, 0);
    this.map.treesLayer = this.map.createDynamicLayer('Trees', tiles, 0, 0);
    this.map.aboveGroundLayer = this.map.createDynamicLayer('AboveGround', tiles, 0, 0);
    this.map.objectsLayer = this.map.createDynamicLayer('Objects', tiles, 0, 0);
    this.map.houseLayer = this.map.createDynamicLayer('House', tiles, 0, 0);

    // add colliding layer
    // this.collidingLayer = this.map.createDynamicLayer('Colliding', tiles, 0, 0);
    // this.collidingLayer.setCollisionByProperty({ collides: true });
  }

  addControls() {
    const controlConfig = {
      camera: this.cameras.main,
      left: this.cursors.left,
      right: this.cursors.right,
      up: this.cursors.up,
      down: this.cursors.down,
      speed: 0.5
    };
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
  }

  addKeys() {
    this.keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      x: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      i: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I),
      shiftKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    };
  }

  addMarker() {
    this.marker = new Marker({
      scene: this,
      mapTileWidth: this.map.tileWidth,
      mapTileHeight: this.map.tileHeight,
      layerToSnap: this.map.groundLayer
    });
  }

  addSockets() {
    this.socket.on('currentPlayers', this.currentPlayers);
    this.socket.on('newPlayer', this.addOtherPlayers);
    this.socket.on('playerMoved', this.playerMoved);
    this.socket.on('disconnect', this.disconnected);
    // this.socket.on('scoreUpdate', this.scoreUpdate);
    this.socket.on('starLocation', this.starLocation);
    this.socket.on('worldItemPlacedUpdate', this.worldObjectPlaced);
  }

}
