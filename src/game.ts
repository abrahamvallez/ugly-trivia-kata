export class Game {
  private players: Array<string> = []
  private places: Array<number> = []
  private purses: Array<number> = []
  private inPenaltyBox: Array<boolean> = []
  private currentPlayer: number = 0
  private isGettingOutOfPenaltyBox: boolean = false

  private popQuestions: Array<string> = []
  private scienceQuestions: Array<string> = []
  private sportsQuestions: Array<string> = []
  private rockQuestions: Array<string> = []

  constructor() {
    this.createQuestions()
  }

  private createQuestions() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i)
      this.scienceQuestions.push("Science Question " + i)
      this.sportsQuestions.push("Sports Question " + i)
      this.rockQuestions.push("Rock Question " + i)
    }
  }

  public addNewPlayer(name: string): boolean {
    this.players.push(name)
    this.places[this.howManyPlayers() - 1] = 0
    this.purses[this.howManyPlayers() - 1] = 0
    this.inPenaltyBox[this.howManyPlayers() - 1] = false

    console.log(name + " was added")
    console.log("They are player number " + this.players.length)

    return true
  }

  private howManyPlayers(): number {
    return this.players.length
  }

  public roll(roll: number) {
    console.log(this.players[this.currentPlayer] + " is the current player")
    console.log("They have rolled a " + roll)

    if (this.inPenaltyBox[this.currentPlayer]) {
      this.handlePenaltyBoxRoll(roll)
    } else {
      this.handleRegularRoll(roll)
    }
  }

  private handleRegularRoll(roll: number) {
    this.movePlayer(roll)

    console.log(
      this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]
    )
    console.log("The category is " + this.currentCategory())
    this.askQuestion()
  }

  private movePlayer(roll: number) {
    this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll
    if (this.places[this.currentPlayer] > 11) {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12
    }
  }

  private handlePenaltyBoxRoll(roll: number) {
    if (this.isRollOdd(roll)) {
      this.isGettingOutOfPenaltyBox = true

      console.log(this.players[this.currentPlayer] + " is getting out of the penalty box")
      this.handleRegularRoll(roll)
    } else {
      console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box")
      this.isGettingOutOfPenaltyBox = false
    }
  }

  private isRollOdd(roll: number) {
    return roll % 2 != 0
  }

  private askQuestion(): void {
    if (this.currentCategory() == "Pop") console.log(this.popQuestions.shift())
    if (this.currentCategory() == "Science") console.log(this.scienceQuestions.shift())
    if (this.currentCategory() == "Sports") console.log(this.sportsQuestions.shift())
    if (this.currentCategory() == "Rock") console.log(this.rockQuestions.shift())
  }

  private currentCategory(): string {
    switch (this.places[this.currentPlayer]) {
      case 0:
      case 4:
      case 8:
        return "Pop"
      case 1:
      case 5:
      case 9:
        return "Science"
      case 2:
      case 6:
      case 10:
        return "Sports"
      default:
        return "Rock"
    }
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] == 6)
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered")
    console.log(this.players[this.currentPlayer] + " was sent to the penalty box")
    this.inPenaltyBox[this.currentPlayer] = true

    this.nextPlayer()
    return true
  }

  private nextPlayer() {
    this.currentPlayer += 1
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!")
        this.purses[this.currentPlayer] += 1
        console.log(
          this.players[this.currentPlayer] +
            " now has " +
            this.purses[this.currentPlayer] +
            " Gold Coins."
        )

        var winner = this.didPlayerWin()
        this.nextPlayer()

        return winner
      } else {
        this.nextPlayer()
        return true
      }
    } else {
      console.log("Answer was correct!!!!")

      this.purses[this.currentPlayer] += 1
      console.log(
        this.players[this.currentPlayer] +
          " now has " +
          this.purses[this.currentPlayer] +
          " Gold Coins."
      )

      var winner = this.didPlayerWin()

      this.nextPlayer()

      return winner
    }
  }
}
