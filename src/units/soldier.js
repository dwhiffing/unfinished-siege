import Melee from '../sprites/melee'

export default class Soldier extends Melee {
  constructor(game, x, y, key) {
    const opts = {
      baseDamage: 10,
      attackSound: 'small_crash_2',
      attackVolume: 0.2,
      baseHealth: 80,
      baseSpeed: 50,
      amount: 1,
      speedVariation: 15,
      healthVariation: 50,
      damageVariation: 5,
    }
    super(game, x, y, key, opts)
  }
}
