import Soldier from '../units/soldier'
import Archer from '../units/archer'

export default class Spawner {
  constructor(game) {
    this.game = game
    this.submitSound = this.game.sound.add('swap2')

    this.soldiers = game.physics.add.group({
      classType: Soldier,
      key: 'soldier',
      enableBody: true,
      physicsBodyType: Phaser.Physics.ARCADE,
      maxSize: 30,
    })

    this.archers = game.physics.add.group({
      classType: Archer,
      key: 'archer',
      maxSize: 30,
    })

    const overlap = (one, two) => {
      one.overlap(two)
      two.overlap(one)
    }
    this.game.physics.add.overlap(this.soldiers, this.soldiers, overlap)
  }

  getTargets() {
    return [...this.soldiers.getChildren().filter(c => c.alive)]
  }

  update() {
    this.soldiers.getChildren().forEach(child => child.update())
  }

  render() {}

  spawn(type, otherSide) {
    // this.submitSound.play()
    let group = this[type]
    if (group) {
      let thing = group.get()
      if (thing) {
        thing.reset(otherSide ? 400 : 0, 225, otherSide ? -1 : 1)
      }
    } else {
      console.warn(`tried to spawn ${type}, which doesnt exist`)
    }
  }
}
