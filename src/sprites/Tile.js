import { TWEEN_DURATION } from '../constants'
import { getBoardPosition, getBoardId } from '../utils'

export default class Tile extends Phaser.GameObjects.Sprite {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame)
    this.game = game
    this.setScale(0.8)
    this.reset(x, y)
  }

  kill() {
    this.setActive(false)
    this.moveTo(-1, -1)
  }

  reset(x, y, frame) {
    this.setFrame(new Phaser.Math.RandomDataGenerator().integerInRange(0, 3))
    this.moveTo(x, y)
  }

  moveTo(x, y) {
    this.updateBoardPosition(x, y)
  }

  tweenTo(x, y) {
    this.updateBoardPosition(x, y, true)
  }

  updateBoardPosition(x, y, tween) {
    const [worldX, worldY] = getBoardPosition(x, y)
    this.posX = x
    this.posY = y
    this.id = getBoardId(x, y)
    if (tween) {
      this.tween(worldX, worldY)
    } else {
      this.x = worldX
      this.y = worldY
    }
  }

  tween(x, y) {
    return this.game.add.tween({
      x,
      y,
      duration: TWEEN_DURATION,
      targets: [this],
    })
  }
}
