export function scoreUpdate(scores) {
  this.blueScoreText.setText('Blue: ' + scores.blue);
  this.redScoreText.setText('Red: ' + scores.red);
}