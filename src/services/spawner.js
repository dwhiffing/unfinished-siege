import Soldier from '../units/soldier'
import Archer from '../units/archer'

export default class Spawner {
  constructor(game) {
    this.game = game
    this.xSpawnOffset = 0
    const repeat = 29
    this.soldiers = game.physics.add.group()
    this.archers = game.physics.add.group()

    this.soldiers.createMultiple({
      classType: Soldier,
      key: 'soldier',
      repeat,
      active: false,
    })

    this.archers.createMultiple({
      classType: Archer,
      key: 'archer',
      repeat,
      active: false,
    })

    this.submitSound = this.game.sound.add('swap2')
    const overlap = (one, two) => {
      one.overlap(two)
      two.overlap(one)
    }
    this.game.physics.add.overlap(this.soldiers, this.soldiers, overlap)
  }

  update() {
    this.soldiers.getChildren().forEach(child => child.update())
  }

  getTargets() {
    return [...this.soldiers.getChildren().filter(c => c.alive)]
  }

  render() {}

  spawn(type, otherSide) {
    this.xSpawnOffset = (this.xSpawnOffset + 1) % 3
    // this.submitSound.play()
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
