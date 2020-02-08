import Unit from './unit'
import Bullet from './bullet'

const ANIMATIONS = {
  idle: {
    key: 'archer_idle',
    frames: [0].map(n => ({ key: 'archer', frame: n })),
    frameRate: 2,
  },
  shoot: {
    key: 'archer_shoot',
    frames: [1].map(n => ({ key: 'archer', frame: n })),
    frameRate: 5,
  },
}

export default class Ranged extends Unit {
  constructor({ game, x, y, key }) {
    super({ game, x, y, key })
    this.addAnimations(ANIMATIONS)
    this.bullets = game.physics.add.group({
      key: 'bullet',
      classType: Bullet,
      maxSize: 15,
      runChildUpdate: true,
    })
    this.attackSound = game.sound.add('pick')
  }

  reset(x, y, flipped) {
    super.reset(x, y, flipped)
    this.x = x + 300 * flipped ? -1 : 1
    this.play('archer_idle')
  }

  shoot(
    numShots = 1,
    size,
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
        this.play('archer_shoot')
        for (let i = 0; i < numShots; i++) {
          let bullet = this.bullets.get()
          bullet.shoot(
            this.x,
            this.y,
            this.flipX,
            minVelocityX,
            maxVelocityX,
            minVelocityY,
            maxVelocityY
          )
        }
      },
    })
  }
}
