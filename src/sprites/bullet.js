export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'bullet')
    this.game = game
  }

  shoot(direction, minVelocityX, maxVelocityX, minVelocityY, maxVelocityY) {
    this.x = this.x + 20 * direction
    this.y = this.y - 50
    this.setActive(true)
    this.setVisible(true)
    this.body.velocity.x =
      new Phaser.Math.RandomDataGenerator().integerInRange(
        minVelocityX,
        maxVelocityX
      ) * this.direction
    this.body.velocity.y = new Phaser.Math.RandomDataGenerator().integerInRange(
      minVelocityY,
      maxVelocityY
    )
  }

  update() {
    if (this.active && this.y > 200) {
      this.setActive(false)
      this.setVisible(false)
      this.game.blasts.get(this.x, this.y, 2)
    }
  }
}
