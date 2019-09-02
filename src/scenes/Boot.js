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

    this.load.spritesheet('tiles', 'assets/images/tiles.png', {
      frameWidth: 75,
      frameHeight: 75,
    })
    this.load.spritesheet('units', 'assets/images/units.png', {
      frameWidth: 15,
      frameHeight: 30,
    })
    this.load.spritesheet('soldier', 'assets/images/soldier.png', {
      frameWidth: 8,
      frameHeight: 15,
    })
    this.load.spritesheet('archer', 'assets/images/archer.png', {
      frameWidth: 11,
      frameHeight: 13,
    })
    this.load.spritesheet('explosion', 'assets/images/explosion.png', {
      frameWidth: 128,
      frameHeight: 128,
    })
    this.load.spritesheet('catapult', 'assets/images/catapult.png', {
      frameWidth: 22,
      frameHeight: 13,
    })
    this.load.spritesheet('highlight', 'assets/images/highlight.png', {
      frameWidth: 495,
      frameHeight: 175,
    })

    this.load.image('cursor', 'assets/images/cursor.png')
    this.load.image('overlay', 'assets/images/overlay.png')
    this.load.image('castle', 'assets/images/castle.png')
    this.load.image('tilebg', 'assets/images/tilebg.png')
    this.load.image('bullet', 'assets/images/bullet.png')
    this.load.image('ground', 'assets/images/ground.png')
    this.load.image('sky', 'assets/images/sky.jpg')
    this.load.image('play', 'assets/images/play.png')
    this.load.image('p1-win', 'assets/images/p1-win.png')
    this.load.image('p2-win', 'assets/images/p2-win.png')

    this.load.audio('medium_crash_1', 'assets/audio/medium_crash_1.mp3')
    this.load.audio('medium_crash_2', 'assets/audio/medium_crash_2.mp3')
    this.load.audio('medium_crash_7', 'assets/audio/medium_crash_6.mp3')
    this.load.audio('small_crash_1', 'assets/audio/small_crash_1.mp3')
    this.load.audio('small_crash_2', 'assets/audio/small_crash_2.mp3')
    this.load.audio('small_crash_3', 'assets/audio/small_crash_3.mp3')
    this.load.audio('footstep', 'assets/audio/footstep.mp3')
    this.load.audio('pick', 'assets/audio/pick.mp3')
    this.load.audio('submit', 'assets/audio/submit.mp3')
    this.load.audio('swap', 'assets/audio/swap.mp3')
    this.load.audio('swap2', 'assets/audio/swap2.mp3')
    this.load.audio('swipe', 'assets/audio/swipe.mp3')
    this.load.audio('submit_failed', 'assets/audio/submit_failed.mp3')

    this.load.on('complete', () => {
      progress.destroy()
      this.scene.start('Game')
      // this.scene.start('Menu')
    })
  }
}
