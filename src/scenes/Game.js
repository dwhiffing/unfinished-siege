import InterfaceService from '../services/InterfaceService'
import TileService from '../services/TileService'
import UnitService from '../services/UnitService'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  create() {
    this.sounds = {}
    this.sounds.recapture = this.sound.add('recaptureNodeSound')
    this.sounds.capture = this.sound.add('captureNodeSound')
    this.sounds.move = this.sound.add('moveToNodeSound')
    this.sounds.click = this.sound.add('clickSound')
    this.sounds.destroy = this.sound.add('destroyNodeSound')
    this.interfaceService = new InterfaceService(this)
    this.tileService = new TileService(this)
    this.unitService = new UnitService(this)
    this.data.set('interfaceService', this.interfaceService)
  }

  update() {
    this.unitService.update()
  }
}
