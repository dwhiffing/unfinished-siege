import Melee from '../sprites/melee'

export default class Soldier extends Melee {
  constructor(game, x, y) {
    super({
      game,
      x,
      y,
      key: 'soldier',
      baseDamage: 10,
      attackSound: 'small_crash_2',
      baseHealth: 30,
      baseSpeed: 50,
      amount: 1,
    })
  }
}
