import { Tile } from '../sprites/Tile'

// Manages tiles and swapping of tiles

export default class TileService {
  constructor(scene) {
    const {
      clientHeight: height,
      clientWidth: width,
    } = document.documentElement
    const xBuffer = 10
    const tileSize = width / 6 - xBuffer - 10
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 6; i++) {
        new Tile(
          35 + i * tileSize + xBuffer * i,
          height - (tileSize + 9) * j - 150,
          scene,
          tileSize * 0.95
        )
      }
    }
  }
}
