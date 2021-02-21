## Description

A dice Game where users can roll a given dice to reach to a given winning point, as soon as the player reaches the winning point the ranks are assigned accordingly

## Rules of the game

- The order in which the users roll the dice is decided randomly at the start of the game.
- If a player rolls the value "6" then they immediately get another chance to roll again and move ahead in the game.
- If a player rolls the value "1" two consecutive times then they are forced to skip their next turn as a penalty.

## System requirements

- nodeJs 10.x and above
- npm package manager

## How to run

- clone the repo
- `cd dice-game/`
- `npm install`
- `npm start`

## Postman collection

- https://www.getpostman.com/collections/b94db746c9dff5404d97

## common terms

- currentPlayer: The player who rolled the dice
- nextPlayer: The player who will play in the next turn
- \_id : Is the gameId

## Routes

- Base-url : http://localhost:3000/

1. POST game/create : Create a new game
2. POST game/roll/gameId/{\_id} : Play the next turn
3. GET game/leaderBoard/gameId/{\_id} : Get game leader-board
4. GET game/status/gameId/{\_id} : Get all players status of a given game
