export default class InputManager {
  constructor(game) {
    this.game = game
    this.keys = game.input.keyboard.addKeys(
      'W,A,S,D,left,down,right,up,space,z,u'
    )

    this.game.input.keyboard.on(
      'keydown_UP',
      () => this.game.cursor.move('y', -1),
      this
    )

    this.game.input.keyboard.on(
      'keydown_DOWN',
      () => this.game.cursor.move('y', 1),
      this
    )

    this.game.input.keyboard.on(
      'keydown_RIGHT',
      () => this.game.cursor.move('x', 1),
      this
    )

    this.game.input.keyboard.on(
      'keydown_LEFT',
      () => this.game.cursor.move('x', -1),
      this
    )

    this.game.input.keyboard.on(
      'keydown_SPACE',
      () => {
        if (this.game.cursor.selected) {
          console.log(this.game.cursor.selected, this.game.cursor)
          this.game.board.swap(this.game.cursor.selected, this.game.cursor)
          this.game.cursor.deselect()
        } else {
          this.game.cursor.select()
        }
      },
      this
    )

    this.game.input.keyboard.on(
      'keydown_Z',
      () => !this.game.board.isSwapping && this.game.board.submitMatches(),
      this
    )

    this.game.input.keyboard.on('keydown_U', () => {
      this.game.spawner.spawn('soldiers')
    })
  }
}
