const MIN_BUILD_TIME = 500
const MAX_BUILD_TIME = 500
const units = ['soldiers']

export default class ArtificialIntelligence {
  constructor(game) {
    this.spawner = game.spawner
    this.game = game
    this.spawnTimer = 0
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
    this.spawner.spawn(units[0], true)
  }
}
