import { Player } from '../../objects/player';

export function addPlayer(playerInfo) {
  this.player = new Player({
    scene: this,
    x: playerInfo.x,
    y: playerInfo.y,
    key: 'person',
    playerInfo: playerInfo
  });
}