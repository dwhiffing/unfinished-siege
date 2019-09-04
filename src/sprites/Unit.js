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

  reset(x, y, flip) {
    this.setPosition(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.flipX = flip
    this.tint = flip ? 0x9999ff : 0xff9999
    this.setOrigin(0.5, 1)
    this.setScale(3)
  }

  render() {}
}
