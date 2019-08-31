import { getBoardPosition, getBoardId } from '../utils'
import { TWEEN_DURATION } from '../constants'

export class Tile {
  constructor(x, y, scene, size) {
    this.sceneRef = scene
    this.sprite = this.sceneRef.add.sprite(x, y, 'tiles')
    this.sprite.setScale(size / 400)
    this.sprite.setOrigin(0)
  }

  // kill() {
  //   this.sprite.kill()
  //   this.moveTo(-1, -1)
  // }

  // reset(x, y, frame) {
  //   this.sprite.reset(x, y)
  //   this.moveTo(x, y)
  // }

  // moveTo(x, y) {
  //   this.updateBoardPosition(x, y)
  // }

  // tweenTo(x, y) {
  //   this.updateBoardPosition(x, y, true)
  // }

  // updateBoardPosition(x, y, tween) {
  //   const [worldX, worldY] = getBoardPosition(x, y)
  //   this.posX = x
  //   this.posY = y
  //   this.id = getBoardId(x, y)
  //   if (tween) {
  //     this.tween(worldX, worldY)
  //   } else {
  //     this.x = worldX
  //     this.y = worldY
  //   }
  // }

  // tween(x, y) {
  //   return this.sceneRef.add.tween(this).to({ x, y, }, TWEEN_DURATION, Phaser.Easing.Quadratic.In, true)
  // }
}
