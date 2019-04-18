import { OtherPlayer } from '../../objects/otherPlayer';

export function addOtherPlayers(playerInfo) {
  const otherPlayer = new OtherPlayer({
    scene: this,
    x: playerInfo.x,
    y: playerInfo.y,
    key: 'otherPlayer',
    playerInfo: playerInfo
  })
  this.otherPlayers.add(otherPlayer);
}