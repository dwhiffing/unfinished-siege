import Phaser from 'phaser'

export default class BlastManager extends Phaser.GameObjects.Group {
  constructor(game) {
    super(game)
    this.game = game
    this.name = 'BlastGroup'

    this.blasts = game.physics.add.group({
      key: 'explosion',
      classType: Blast,
      maxSize: 15,
      active: false,
      visible: false,
      runChildUpdate: true,
    })
  }

  get(x, y, scale = 0.3, flipX) {
    let blast = this.blasts.get()
    blast.reset(x, y, scale, flipX)
    return blast
  }
}

class Blast extends Phaser.GameObjects.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key)
    this.game = game
    this.setOrigin(0.5, 0.5)
  }

  reset(x, y, scale, flipX) {
    this.setActive(true)
    this.setVisible(true)
    this.setPosition(x, y)
    this.tint = 0xffffff
    this.setScale(scale, scale)
    this.angle = new Phaser.Math.RandomDataGenerator().integerInRange(0, 360)
    this.game.anims.create({
      key: 'boom',
      frameRate: 20,
      frames: [0, 1, 2, 3].map(n => ({ key: 'explosion', frame: n })),
    })
    this.play('boom')
    this.game.time.addEvent({
      delay: 200,
      callback: () => {
        this.setActive(false)
        this.setVisible(false)
      },
    })
    this.getInRangeForDamage(
      this,
      Math.floor(scale * 100),
      this.game.spawner.getTargets()
    ).forEach(r => {
      if (r.flipX !== flipX) {
        r.hit(scale * 50)
      }
    })
  }

  getInRangeForDamage(source, range, array) {
    return array.filter(thing => {
      const _range = this.getDist(source, thing)
      return _range < range
    })
  }

  getDist(source, thing) {
    return this.game.math.distance(source.x, source.y, thing.x, thing.y)
  }
}
