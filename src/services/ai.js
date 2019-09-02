const MIN_BUILD_TIME = 100
const MAX_BUILD_TIME = 300
const units = [
  ['soldiers', 'knights', 'elephants'],
  ['slings', 'archers', 'catapults'],
]

export default class ArtificialIntelligence {
  constructor(game) {
    this.spawner = game.spawner
    this.game = game
    this.setTimer()
  }

  setTimer() {
    this.spawnTimer = new Phaser.Math.RandomDataGenerator().integerInRange(
      MIN_BUILD_TIME,
      MAX_BUILD_TIME
    )
  }

  update() {
    this.spawnTimer--
    if (this.spawnTimer <= 0) {
      this.setTimer()
      this.spawnUnit()
    }
  }

  spawnUnit() {
    this.spawner.spawn(this.chooseUnit(), true)
  }

  chooseUnit() {
    let diceRoll = new Phaser.Math.RandomDataGenerator().integerInRange(0, 100)
    let size = 0
    // if (diceRoll > 30) {
    //   size = 1
    // }
    // if (diceRoll > 60) {
    //   size = 2
    // }
    let type = 0 // || new Phaser.Math.RandomDataGenerator().integerInRange(0, 1)

    return units[type][size]
  }
}
