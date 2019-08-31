import { Unit } from '../sprites/Unit'

// Spawns and updates units, lets them know when attacking, moving.etc

export default class UnitService {
  constructor(scene) {
    const { clientWidth: width } = document.documentElement
    const unitSize = width / 3000
    this.units = []
    for (let i = 0; i < 30; i++) {
      let y = 0
      if (i > 10) {
        y = i > 20 ? 1 : 2
      }
      this.units.push(new Unit(-10, y, scene, unitSize))
    }
  }

  update() {
    this.units.forEach(unit => unit.update())
  }
}
