import Phaser from 'phaser'

export default class BlastManager extends Phaser.GameObjects.Group {
  constructor(game) {
    super(game)
    this.game = game
    this.name = 'BlastGroup'
  }

  create() {
    let blast = this.game.add.sprite(0, 0, 'explosion')
    blast.setOrigin(0.5, 0.5)
    this.add(blast)

    let animation = this.game.anims.create({
      key: 'boom',
      frames: [0, 1, 2, 3].map(n => ({ key: 'explosion', frame: n })),
    })
    animation.killOnComplete = true

    return blast
  }

  get(x, y, scale = 0.3, flipX) {
    let blast = this.getFirstDead() || this.create()
    blast.setActive(true)
    blast.setVisible(true)
    blast.x = x
    blast.y = y
    blast.tint = 0xffffff
    blast.setScale(scale, scale)

    blast.angle = new Phaser.Math.RandomDataGenerator().integerInRange(0, 360)
    blast.play('boom')
    this.getInRangeForDamage(
      blast,
      Math.floor(scale * 100),
      this.game.spawner.getTargets()
    ).forEach(r => {
      if (r.flipX !== flipX) {
        r.hit(scale * 50)
      }
    })

    return blast
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
