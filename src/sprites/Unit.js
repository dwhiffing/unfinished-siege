// Can move or attack

export class Unit {
  constructor(x, y, scene, size) {
    this.sceneRef = scene
    this.sprite = this.sceneRef.add.sprite(x, 120 + y * 75, 'tiles')
    const scale = y * 0.02
    this.sprite.setScale(size / 2 + scale, size + scale)
    this.sprite.setOrigin(0.5, 1)
    this.sprite.alpha = (y + 1) * 0.1
  }
  update() {
    this.sprite.x += 0.5
  }
}
