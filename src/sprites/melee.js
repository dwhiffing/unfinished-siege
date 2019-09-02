import Unit from './unit'

const change = (arr, key) => arr.map(n => ({ key, frame: n }))
const ANIMATIONS = {
  idle: {
    key: 'soldier_idle',
    frames: change([0], 'soldier'),
  },
  walk: {
    key: 'soldier_walk',
    frames: change([0, 1, 0, 2], 'soldier'),
    frameRate: 5,
    repeat: -1,
  },
  attack: {
    key: 'soldier_attack',
    frames: change([0, 3, 4], 'soldier'),
    frameRate: 5,
  },
}

export default class Melee extends Unit {
  constructor(
    game,
    x,
    y,
    key,
    {
      baseDamage = 1,
      baseHealth = 10,
      baseSpeed = 100,
      attackSound = 'swipe',
      amount = 1,
    }
  ) {
    super(game, x, y, key)
    this.baseDamage = baseDamage
    this.baseHealth = baseHealth
    this.baseSpeed = baseSpeed
    this.amount = amount
    this.attackSound = game.sound.add(attackSound)
    // this.addAnimations(ANIMATIONS)
    // this.setSize(this.width, this.height)
    // this.setScale(2)

    // this.setOrigin(0.5, 1)
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    // this.play('soldier_walk')
    this.maxHealth = this.baseHealth
    this.health = this.maxHealth
    this.speed = this.baseSpeed * direction
    this.damageAmount = this.baseDamage
    this.body.velocity.x = this.speed
  }

  update() {
    if (!this.active) {
      return
    }

    if (!this.isStopped && !this.isAttacking && this.body.velocity.x === 0) {
      this.body.velocity.x = this.speed
    }

    if (this.x > 450) {
      this.game.castle2.damage(this.damageAmount)
      this.destroy()
    } else if (this.x < -50) {
      this.game.castle.damage(this.damageAmount)
      this.destroy()
    }
  }

  stop() {
    if (this.isStopped) {
      return
    }
    // this.play('soldier_idle')
    this.isStopped = true
    this.body.velocity.x = 0
    this.game.time.addEvent({
      delay: 500,
      callback: this.check.bind(this),
    })
  }

  check() {
    if (!this.isAttacking) {
      this.isStopped = false
      // this.play('soldier_walk')
      this.body.velocity.x = this.speed
    } else {
      this.game.time.addEvent({
        delay: 500,
        callback: this.check.bind(this),
      })
    }
  }

  overlap(unit) {
    if (!this.active) {
      return
    }
    if (unit.direction !== this.direction) {
      if (!this.isAttacking) {
        this.attack(unit)
      }
    } else {
      if (
        (this.direction === 1 && this.x < unit.x) ||
        (this.direction === -1 && this.x > unit.x)
      ) {
        this.stop()
      }
    }
  }

  destroy() {
    this.setActive(false)
    this.setVisible(false)
  }

  hit(amount) {
    this.health -= amount
    if (this.health < 0) {
      this.destroy()
    }
  }

  attack(soldier) {
    // this.play('soldier_attack')
    // this.attackSound.play()
    this.isAttacking = true
    this.body.velocity.x = 0
    this.game.time.addEvent({
      delay: 500,
      callback: () => {
        soldier.hit(this.damageAmount)
        this.isAttacking = false
      },
    })
  }
}
