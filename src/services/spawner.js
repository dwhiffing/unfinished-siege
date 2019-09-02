import Soldier from '../units/soldier'
import Knight from '../units/knight'
import Elephant from '../units/elephant'
import Archer from '../units/archer'
import Catapult from '../units/catapult'
import Sling from '../units/sling'

export default class Spawner {
  constructor(game) {
    this.game = game
    this.xSpawnOffset = 0
    const repeat = 29
    this.soldiers = game.physics.add.group()
    this.knights = game.physics.add.group()
    this.elephants = game.physics.add.group()
    this.archers = game.physics.add.group()
    this.slings = game.physics.add.group()
    this.catapults = game.physics.add.group()

    this.soldiers.createMultiple({
      classType: Soldier,
      key: 'soldier',
      repeat,
      active: false,
    })

    this.knights.createMultiple({
      classType: Knight,
      key: 'knight',
      repeat,
      active: false,
    })
    this.archers.createMultiple({
      classType: Archer,
      key: 'archer',
      repeat,
      active: false,
    })
    this.slings.createMultiple({
      classType: Sling,
      key: 'sling',
      repeat,
      active: false,
    })
    this.elephants.createMultiple({
      classType: Elephant,
      key: 'elephant',
      repeat,
      active: false,
    })
    this.catapults.createMultiple({
      classType: Catapult,
      key: 'catapult',
      repeat,
      active: false,
    })

    this.submitSound = this.game.sound.add('swap2')
    const overlap = (one, two) => {
      one.overlap(two)
      two.overlap(one)
    }
    this.game.physics.add.overlap(this.soldiers, this.soldiers, overlap)
    // this.game.physics.overlap(this.soldiers, this.knights, overlap)
    // this.game.physics.overlap(this.soldiers, this.elephants, overlap)
    // this.game.physics.overlap(this.knights, this.soliders, overlap)
    // this.game.physics.overlap(this.knights, this.elephants, overlap)
    // this.game.physics.overlap(this.knights, this.knights, overlap)
    // this.game.physics.overlap(this.elephants, this.soliders, overlap)
    // this.game.physics.overlap(this.elephants, this.knights, overlap)
    // this.game.physics.overlap(this.elephants, this.elephants, overlap)
  }

  update() {
    this.soldiers.getChildren().forEach(child => child.update())
  }

  getTargets() {
    return [
      ...this.soldiers.getChildren().filter(c => c.alive),
      ...this.knights.getChildren().filter(c => c.alive),
      ...this.elephants.getChildren().filter(c => c.alive),
    ]
  }

  render() {}

  spawn(type, otherSide) {
    this.xSpawnOffset = (this.xSpawnOffset + 1) % 3
    this.submitSound.play()
    let group = this[type]
    if (group) {
      let thing = group.getFirstDead()
      if (!thing) return
      let amount = group.getFirstDead().amount || 1
      for (let i = 0; i < amount; i++) {
        let thing = group.getFirstDead()
        if (!thing) return
        const offset = thing.unitWidth * this.xSpawnOffset
        const dir = otherSide ? -1 : 1
        let x = otherSide ? 400 : 0
        if (/archer|sling|catapult/.test(type)) {
          x += offset * dir
        }
        thing.reset(x, 225, dir)
      }
    } else {
      console.warn(`tried to spawn ${type}, which doesnt exist`)
    }
  }
}
