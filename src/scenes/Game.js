import Board from '../services/board'
import Input from '../services/input'
import AI from '../services/ai'
import BlastManager from '../services/blastManager'
import Castle from '../services/castle'
import Spawner from '../services/spawner'
import Cursor from '../sprites/cursor'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  create() {
    this.board = new Board(this)
    this.cursor = new Cursor(this)
    this.inputManager = new Input(this)
    this.spawner = new Spawner(this)
    this.castle = new Castle(this, -60, 150, '1')
    this.castle2 = new Castle(this, 470, 150, '2')
    this.blasts = new BlastManager(this)
    this.ai = new AI(this)
    this.board.checkForMatches()
  }

  update() {
    this.spawner.update()
    this.ai.update()
  }

  render() {
    this.spawner.render()
  }
}
