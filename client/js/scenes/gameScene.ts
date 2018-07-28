import { Player } from '../objects/player';
import { OtherPlayer } from '../objects/otherPlayer';
import { Item } from '../objects/item';
import { Inventory } from '../objects/inventory';
import { Marker } from '../objects/marker';

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
    private cursors: any;
    private blueScoreText: any;
    private redScoreText: any;

    constructor() {
        super({
            key: 'GameScene'
        });
        this.currentPlayers = this.currentPlayers.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.addOtherPlayers = this.addOtherPlayers.bind(this);
        this.playerMoved = this.playerMoved.bind(this);
        this.disconnected = this.disconnected.bind(this);
        this.scoreUpdate = this.scoreUpdate.bind(this);
        this.starLocation = this.starLocation.bind(this);
    }

    init(): void {
      this.socket = io();
      this.player = null;
    }

    create(): void {
        // create map
        this.createMap();
        
        // add network players
        this.otherPlayers = this.physics.add.group();

        // add support for keyboard pressing
        this.cursors = this.input.keyboard.createCursorKeys();

        // add scoreboard
        this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });
        this.redScoreText = this.add.text(584, 16, '', { fontSize: '32px', fill: '#FF0000' });

        // add controls
        this.addControls();
        this.addKeys();
        this.addMarker();
        this.addSockets();

        // add inventory
        new Inventory({
          scene: this,
          x: 0,
          y: 0,
          key: 'inventoryContainer'
        });

        // TODO: if item is selected and item is not over any obstacles (inventory, dialog, house, tree, etc)
        this.input.on('pointerdown', function (pointer) {

          const data = {
            type: 'flower',
            name: 'cool flower',
            level: 0,
            owner: 'playerId1234',
            value: 12
          }
          new Item({
            scene: this,
            x: this.marker.snappedWorldPoint.x,
            y: this.marker.snappedWorldPoint.y,
            frame: 39,
            key: "desert_sprites",
            itemData: data
          });
          const tile = this.map.groundLayer.putTileAtWorldXY(6, this.marker.snappedWorldPoint.x, this.marker.snappedWorldPoint.y);
          tile.setCollision(true);

        }, this);

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

      console.log('this.map', this.map);

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
      this.socket.on('scoreUpdate', this.scoreUpdate);
      this.socket.on('starLocation', this.starLocation);
    }

    starLocation(starLocation) {
      const { socket, player, physics } = this;

      if (this.star) this.star.destroy();
      this.star = physics.add.image(starLocation.x, starLocation.y, 'star');
      physics.add.overlap(player, this.star, function () {
        socket.emit('starCollected');
      }, null, this);
    }

    scoreUpdate(scores) {
      this.blueScoreText.setText('Blue: ' + scores.blue);
      this.redScoreText.setText('Red: ' + scores.red);
    }

    disconnected(playerId) {
      this.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    }

    playerMoved(playerInfo) {
        this.otherPlayers.getChildren().forEach(function (otherPlayer) {
            if (playerInfo.playerId === otherPlayer.playerId) {
                otherPlayer.setPosition(playerInfo.x, playerInfo.y);
            }
        });
    }

    currentPlayers(players) {
        const { socket, addPlayer, addOtherPlayers } = this;
        Object.keys(players).forEach(function (id) {
            if (players[id].playerId === socket.id) {
                addPlayer(players[id]);
            } else {
                addOtherPlayers(players[id]);
            }
        });
    }

    addPlayer(playerInfo) {
        this.player = new Player({
          scene: this,
          x: playerInfo.x,
          y: playerInfo.y,
          key: 'person',
          playerInfo: playerInfo
        });
      }
    
      addOtherPlayers(playerInfo) {
        const otherPlayer = new OtherPlayer({
          scene: this,
          x: playerInfo.x,
          y: playerInfo.y,
          key: 'otherPlayer',
          playerInfo: playerInfo
        })
        this.otherPlayers.add(otherPlayer);
      }
}
