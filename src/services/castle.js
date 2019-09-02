import Soldier from '../units/soldier'
import Knight from '../units/knight'
import Elephant from '../units/elephant'
import Archer from '../units/archer'
import Catapult from '../units/catapult'
import Sling from '../units/sling'

export default class Castle {
  constructor(game, x, y, name) {
    this.game = game

    this.sprite = game.add.sprite(x, y, 'castle')
    this.sprite.health = 100
    this.name = name
    this.healthText = game.add.text(
      this.name === '1' ? x + 60 : x - 90,
      y - 100,
      '100'
    )
  }

  damage(amount) {
    this.sprite.health -= amount
    if (this.sprite.health <= 0) {
      this.game.time.addEvent({
        delay: 500,
        callback: () => {
          this.game.scene.start('GameOver', {
            winnerIndex: this.name === '1' ? 1 : 0,
          })
        },
      })
    }
    this.healthText.text = this.sprite.health
  }
}
