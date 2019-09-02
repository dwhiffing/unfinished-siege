import Phaser from 'phaser'

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame)
    this.setOrigin(0.5, 1)
    this.game = game
  }

  addAnimations(animations) {
    Object.values(animations).forEach(value => this.game.anims.create(value))
  }

  reset(x, y, direction = 1) {
    this.x = x
    this.y = y
    this.direction = direction
    this.flipX = direction === -1
    this.tint = direction === 1 ? 0xff9999 : 0x9999ff
    this.setScale(3)
    this.setActive(true)
  }

  update() {}

  render() {}
}
