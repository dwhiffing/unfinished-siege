import Unit from './unit'

const ANIMATIONS = {
  idle: [[0], 2],
  shoot: [[1], 2],
}

export default class Ranged extends Unit {
  constructor(
    game,
    x,
    y,
    key,
    { boomSound = 'small_crash_1', boomVolume = 1 }
  ) {
    super(game, x, y, key)
    this.addAnimations(ANIMATIONS)
    this.bullets = game.physics.add.group()
    this.bullets.createMultiple({ key: 'bullet', repeat: 15, active: false })
    this.attackSound = game.sound.add('pick')
    this.boomSound = game.sound.add(boomSound)
    this.boomSound.volume = boomVolume
    this.unitWidth = 30
    this.bullets.getChildren().forEach(bullet => {
      bullet.setGravity(0, 200)
      bullet.explode = () => {
        // this.boomSound.play()
        this.game.blasts.get(
          bullet.x,
          bullet.y,
          Math.pow(bullet.size, 3) / 7,
          this.direction
        )
        bullet.setActive(false)
      }
    })
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.x = x
    this.direction = direction
    this.play('idle')
  }

  shoot(
    numShots = 1,
    size = 1,
    minVelocityX,
    maxVelocityX,
    minVelocityY,
    maxVelocityY,
    minShotTime,
    maxShotTime
  ) {
    this.game.time.addEvent({
      delay: new Phaser.Math.RandomDataGenerator().integerInRange(
        minShotTime,
        maxShotTime
      ),
      callback: () => {
        this.play('shoot')
        for (let i = 0; i < numShots; i++) {
          let bullet = this.bullets.getFirstDead()
          // this.attackSound.play()
          this.lifespan = new Phaser.Math.RandomDataGenerator().integerInRange(
            2500,
            3000
          )
          bullet.x = this.x + 20 * this.direction
          bullet.y = this.y - 50
          bullet.setActive(true)
          bullet.size = size
          bullet.setScale(size)
          bullet.body.velocity.x =
            new Phaser.Math.RandomDataGenerator().integerInRange(
              minVelocityX,
              maxVelocityX
            ) * this.direction
          bullet.body.velocity.y = new Phaser.Math.RandomDataGenerator().integerInRange(
            minVelocityY,
            maxVelocityY
          )
        }
      },
    })
  }

  update() {
    //   this.game.physics.arcade.overlap(
    //     this.bullets,
    //     this.game.ground,
    //     (one, two) => {
    //       if (one.explode) {
    //         one.explode()
    //       } else if (two.explode) {
    //         two.explode()
    //       }
    //     },
    //     null,
    //     this
    //   )
  }
}
