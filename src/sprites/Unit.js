import Phaser from 'phaser'

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor({ game, x, y, key }) {
    super(game, x, y)
    this.setTexture(key)
    this.game = game
  }

  addAnimations(animations) {
    Object.values(animations).forEach(value => this.game.anims.create(value))
  }

  reset(x, y, direction = 1) {
    this.setPosition(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.direction = direction
    this.flipX = direction === -1
    this.tint = direction === 1 ? 0xff9999 : 0x9999ff
    this.setOrigin(0.5, 1)
    this.setScale(3)
  }

  render() {}
}
