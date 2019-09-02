import Unit from './unit'

const change = (arr, key) => arr.map(n => ({ key, frame: n }))
const ANIMATIONS = {
  idle: {
    key: 'idle',
    frames: change([0, 1, 0, 2], 'soldier'),
    frameRate: 20,
    repeat: 100,
  },
  walk: {
    key: 'walk',
    frames: change([0, 1, 0, 2], 'soldier'),
    frameRate: 20,
    repeat: 100,
  },
  attack: { key: 'attack', frames: change([0, 3, 4], 'soldier'), frameRate: 5 },
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
    this.addAnimations(ANIMATIONS)
  }

  reset(x, y, direction) {
    super.reset(x, y, direction)
    this.play('walk')
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
    this.hasOverlapped = false

    if (!this.isStopped && !this.isAttacking && this.body.velocity.x === 0) {
      this.body.velocity.x = this.speed
    }

    if (this.x > 450 || this.x < -50) {
      if (this.x > 450) {
        this.game.castle2.damage(this.damageAmount)
      } else {
        this.game.castle.damage(this.damageAmount)
      }
      this.setActive(false)
    }
  }

  stop() {
    if (this.isStopped) {
      return
    }
    this.isStopped = true
    this.body.velocity.x = 0
    this.game.time.addEvent({
      delay: 500,
      callback: () => {
        this.isStopped = false
      },
    })
  }

  overlap(unit) {
    if (!this.active) {
      return
    }
    this.hasOverlapped = true
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

  hit(amount) {
    this.health -= amount
    if (this.health < 0) {
      this.setActive(false)
    }
  }

  attack(soldier) {
    this.play('attack')
    this.attackSound.play()
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
