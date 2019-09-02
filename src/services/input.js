const spawns = {
  melee: {
    one: 'soldiers',
    two: 'knights',
    three: 'elephants',
  },
  ranged: {
    one: 'slings',
    two: 'archers',
    three: 'catapults',
  },
}

export default class InputManager {
  constructor(game) {
    this.game = game
    this.keys = game.input.keyboard.addKeys(
      'W,A,S,D,left,down,right,up,space,z,u,i,o,p,shift,1,2,3'
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

    const spawnThing = spawns => {
      if (this.keys['2'].isDown) {
        return spawns.two
      } else if (this.keys['3'].isDown) {
        return spawns.three
      } else {
        return spawns.one
      }
    }

    this.game.input.keyboard.on('keydown_U', () => {
      this.game.spawner.spawn(spawnThing(spawns.melee))
    })
  }
}
