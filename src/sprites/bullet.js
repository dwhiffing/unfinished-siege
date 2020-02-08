export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'bullet')
    this.game = game
  }

  shoot(x, y, flipX, minVelocityX, maxVelocityX, minVelocityY, maxVelocityY) {
    const direction = flipX ? -1 : 1
    this.x = x + 20 * direction
    this.flipX = flipX
    this.y = y - 50
    this.body.setGravity(0, 120)
    this.setActive(true)
    this.setVisible(true)
    this.body.velocity.x =
      new Phaser.Math.RandomDataGenerator().integerInRange(
        minVelocityX,
        maxVelocityX
      ) * direction
    this.body.velocity.y = new Phaser.Math.RandomDataGenerator().integerInRange(
      minVelocityY,
      maxVelocityY
    )
    console.log(this.body.velocity.x)
  }

  update() {
    if (this.active && this.y > 220) {
      this.setActive(false)
      this.setVisible(false)
      this.game.blasts.get(this.x, this.y, 0.5, this.flipX)
    }
  }
}
