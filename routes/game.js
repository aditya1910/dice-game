var express = require('express');
const router = express.Router();
const game = require('../service/game')

// local storage of all the games
const games = {}

// controller to create a new game for a given player count
router.post('/create', function (req, res) {
  const { playerCount, winningScore } = req.body
  // player count and winning Score required
  if (!playerCount || !winningScore) {
    console.log('Invalid input');
    return res.status(400).send({ status: false, msg: 'Invalid input' })
  }
  const newGame = new game(playerCount, winningScore)
  const _id = newGame.getGameId()
  games[_id] = newGame
  return res.status(201).send({ status: true, _id })
});

// controller to get the leader-board of given gameId
router.get('/leaderBoard/gameId/:gameId', function (req, res) {
  const { gameId } = req.params
  if (!games[gameId]) {
    console.log('Invalid input');
    return res.status(400).send({ status: false, msg: 'Invalid gameId' })
  }
  const game = games[gameId]
  return res.status(200).send({ status: true, result: game.getLeaderBoard() })
});

// controller to get the all player status of given gameId
router.get('/status/gameId/:gameId', function (req, res) {
  const { gameId } = req.params
  if (!games[gameId]) {
    console.log('Invalid input');
    return res.status(400).send({ status: false, msg: 'Invalid gameId' })
  }
  const game = games[gameId]
  return res.status(200).send({ status: true, result: game.getPlayerStatus() })
});

// controller to play the next move in a given game
router.post('/roll/gameId/:gameId', function (req, res, next) {
  const { gameId } = req.params
  if (!games[gameId]) {
    console.log('Invalid input');
    return res.status(400).send({ status: false, msg: 'Invalid gameId' })
  }
  const game = games[gameId]
  try {
    const response = game.playDice()
    return res.status(200).send(response)
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message })
  }
});


module.exports = router;
