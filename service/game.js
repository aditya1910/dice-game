// players class handle players functionality
class player {
  constructor(id) {
    this.name = `player-${id}`
    // flag to check if player is still in the game
    this.isActive = true
    // flag to check if player can play the next turn
    this.canRoll = true
    this.rank = 0
    this.id = id
    this.score = 0
    // move history of players respectively
    this.playerMoves = []
  }
}

// dice class to handel dice functions
class dice {
  // face-count by default it's 6 [1,2,3,4,5,6]
  constructor(faceCount = 6) {
    this.currentNumber = ''
    this.faceCount = this.faceCount
  }
  roll() {
    this.currentNumber = Math.floor(Math.random() * this.faceCount) + 1
    return this.currentNumber
  }
}


// Game class to handle all the events of a given game
class game {
  constructor(playerCount, winningScore) {
    this.players = []
    // Fill all the players
    for (let i = 1; i <= playerCount; i++) {
      this.players.push(new player(i))
    }
    // generate a unique gameId
    this.gameId = Math.floor(Math.random() * 1000) + 1
    this.leaderBoard = []
    this.winningScore = winningScore
    this.dice = new dice()
    this.currentPlayerIndex = 0
  }

  // function to get the leader-board
  getLeaderBoard() {
    return this.leaderBoard
  }

  // function to compute who will play next
  getNextPlayer() {
    let player = null
    let nextIndex = this.currentPlayerIndex % this.players.length
    const activePlayers = this.players.filter((item) => item.isActive).length
    const cantRoll = this.players.filter((item) => !item.canRoll).length
    while (!player && activePlayers > 1 && activePlayers > cantRoll) {
      player = (this.players[nextIndex].isActive && this.players[nextIndex].canRoll) ? this.players[nextIndex] : null
      nextIndex = (nextIndex + 1) % this.players.length
    }
    if (!player && activePlayers)
      player = this.players[nextIndex]
    return player
  }

  // function to compute who's player chance is this
  getCurrentActivePlayer() {
    let currentPlayer = null
    while (!currentPlayer) {
      currentPlayer = (this.players[this.currentPlayerIndex].isActive && this.players[this.currentPlayerIndex].canRoll) ? this.players[this.currentPlayerIndex] : null
      this.players[this.currentPlayerIndex].canRoll = true
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
    }
    return currentPlayer
  }

  // function to get gameId
  getGameId() {
    return this.gameId
  }

  // function to get all players status 
  getPlayerStatus() {
    return this.players
  }

  // function to check if given game is active or not 
  isGameActive() {
    if (this.leaderBoard.length === this.players.length) {
      return false
    }
    return true
  }

  // function to roll the dice if game is active for currentPlayer
  playDice() {
    if (!this.isGameActive())
      throw new Error('Game ended')

    let playingUser = this.getCurrentActivePlayer()

    const diceNumber = this.dice.roll()

    playingUser.score += diceNumber
    playingUser.playerMoves.push(diceNumber)
    let movesLength = playingUser.playerMoves.length
    let msg = ''

    if (movesLength > 1 && playingUser.playerMoves[movesLength - 1] === 1 && playingUser.playerMoves[movesLength - 2] === 1) {
      playingUser.canRoll = false
      msg = `${playingUser.name} you are penalized cause of two consecutive 1`
    }

    if (diceNumber === 6) {
      this.currentPlayerIndex = this.currentPlayerIndex ? (this.currentPlayerIndex - 1) % this.players.length : this.players.length - 1
      msg = `${playingUser.name} you are rewarded cause you got 6, you can roll the dice again`
    }

    if (playingUser.score >= this.winningScore) {
      playingUser.isActive = false
      playingUser.rank = this.leaderBoard.length + 1
      this.leaderBoard.push(playingUser)
      msg = `${playingUser.name} you won, your rank is ${playingUser.rank}`
    }
    let nextPlayer = null
    if (this.isGameActive()) {
      nextPlayer = this.getNextPlayer()
    }
    const response = { status: true, leaderBoard: this.leaderBoard, nextPlayer: nextPlayer ? nextPlayer.name : null, currentPlayer: playingUser.name, diceFace: diceNumber, msg }
    return response
  }

}


module.exports = game 
