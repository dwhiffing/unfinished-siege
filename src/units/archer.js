import Ranged from '../sprites/ranged'

const SHOT_TIME = 300
const MIN_SHOT_VELOCITY_X = 80
const MAX_SHOT_VELOCITY_X = 100
const MIN_SHOT_VELOCITY_Y = -150
const MAX_SHOT_VELOCITY_Y = -170

export default class Archer extends Ranged {
  constructor(game, x, y, key) {
    super({ game, x, y, key })
  }

  reset(x, y, flipped) {
    super.reset(x, y, flipped)
    this.shoot()
  }

  shoot(numShots = 8, size = 1.5) {
    this.game.time.addEvent({
      delay: SHOT_TIME,
      repeat: numShots,
      callback: () => {
        super.shoot(
          1,
          size,
          MIN_SHOT_VELOCITY_X,
          MAX_SHOT_VELOCITY_X,
          MIN_SHOT_VELOCITY_Y,
          MAX_SHOT_VELOCITY_Y,
          0,
          0
        )
      },
    })
  }
}
