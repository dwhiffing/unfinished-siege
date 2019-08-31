export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    function setScaleFactor() {
      const {
        clientHeight: height,
        clientWidth: width,
      } = document.documentElement
      if (height < width) {
        this.game.scaleFactor = document.documentElement.clientHeight / 1200
      } else {
        this.game.scaleFactor = document.documentElement.clientWidth / 1200
        if (this.game.scaleFactor < 0.4) {
          this.game.scaleFactor = 0.4
        }
      }
    }
    this.game.setScaleFactor = setScaleFactor.bind(this)
    this.game.setScaleFactor()

    // this.gameScale.setMode('resize')
    const progress = this.add.graphics()
    this.load.on('progress', value => {
      progress.clear()
      progress.fillStyle(0xffffff, 1)
      progress.fillRect(
        0,
        this.sys.game.config.height / 2,
        this.sys.game.config.width * value,
        60
      )
    })

    this.load.image('p1-win', 'assets/images/p1-win.png')
    this.load.image('p2-win', 'assets/images/p2-win.png')
    this.load.image('coin', 'assets/images/coin.png')
    this.load.image('exit', 'assets/images/exit.png')
    this.load.image('play', 'assets/images/play.png')
    this.load.image('menu-bubble', 'assets/images/menu-bubble.png')
    this.load.audio('moveToNodeSound', 'assets/audio/check.wav')
    this.load.audio('clickSound', 'assets/audio/click.wav')
    this.load.audio('recaptureNodeSound', 'assets/audio/recapture.mp3')
    this.load.audio('captureNodeSound', 'assets/audio/coin.mp3')
    this.load.audio('destroyNodeSound', 'assets/audio/error.mp3')

    this.load.image('sound', 'assets/images/sound.png')
    this.load.image('particle-green', 'assets/images/particle-green.png')
    this.load.image('particle-pink', 'assets/images/particle-pink.png')
    this.load.image('fullscreen', 'assets/images/fullscreen.png')
    this.load.image('nodeGreen', 'assets/images/hexg.png')
    this.load.image('nodePink', 'assets/images/hexp.png')
    this.load.image('handle', 'assets/images/handle1.png')
    this.load.image('handle2', 'assets/images/handle2.png')
    this.load.spritesheet('tiles', 'assets/images/tiles.png', {
      frameWidth: 400,
      frameHeight: 400,
    })
    this.load.spritesheet('hexagon', 'assets/images/hex.png', {
      frameWidth: 392,
      frameHeight: 452,
    })

    this.load.on('complete', () => {
      progress.destroy()
      this.scene.start('Game')
      // this.scene.start('Menu')
    })
  }
}
