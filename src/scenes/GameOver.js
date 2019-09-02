export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' })
  }

  init(data) {
    this.data = data
  }

  create() {
    const {
      clientHeight: height,
      clientWidth: width,
    } = document.documentElement

    const play = this.add
      .image(width / 2, height / 2 + height / 3, 'play')
      .setInteractive()
    play.setScale(this.game.scaleFactor * 0.7)
    play.on('pointerdown', () => {
      this.scene.start('Game')
    })

    const winText = this.add.sprite(
      width / 2,
      500,
      this.data.winnerIndex === 1 ? 'p2-win' : 'p1-win'
    )
    winText.setScale(this.game.scaleFactor * 0.5)
  }
}
