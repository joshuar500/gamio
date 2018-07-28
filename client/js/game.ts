/**
 * @author       Joshua Rincon <joshua.rincon@gmail.com>
 * @copyright    2018 Joshua Rincon
 * @description  MMORPG WIP
 * @license      MIT
 */

/// <reference path="./phaser.d.ts"/>

// import "./lib/phaser.min";
import "./lib/phaser";
import { GameScene } from './scenes/gameScene';
import { BootScene } from "./scenes/bootScene";
import { MainMenuScene } from "./scenes/mainMenuScene";

const config: GameConfig = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { y: 0 }
      }
    },
    scene: [
      BootScene,
      MainMenuScene,
      GameScene
    ],
    pixelArt: true
  };

  export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
      super(config);
    }
  }
   
  window.onload = () => {
    var game = new Game(config);
  }
