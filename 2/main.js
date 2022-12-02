const fs = require('fs');

const signScores = {
    rock: 1,
    paper: 2,
    scissors: 3
}
const roundScores = {
    win: 6,
    draw: 3,
    lose: 0
}

const combinationScores = {
    'A X': roundScores.draw + signScores.rock,
    'A Y': roundScores.win + signScores.paper,
    'A Z': roundScores.lose + signScores.scissors,
    'B X': roundScores.lose + signScores.rock,
    'B Y': roundScores.draw + signScores.paper,
    'B Z': roundScores.win + signScores.scissors,
    'C X': roundScores.win + signScores.rock,
    'C Y': roundScores.lose + signScores.paper,
    'C Z': roundScores.draw + signScores.scissors
}

//X = lose
//Y = draw
//Z = win
const correctScores = {
    'A X': combinationScores['A Z'],
    'A Y': combinationScores['A X'],
    'A Z': combinationScores['A Y'],
    'B X': combinationScores['B X'],
    'B Y': combinationScores['B Y'],
    'B Z': combinationScores['B Z'],
    'C X': combinationScores['C Y'],
    'C Y': combinationScores['C Z'],
    'C Z': combinationScores['C X']
}

let myTotalScore = 0;
let correctTotalScore = 0;
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const rounds = data.split('\n').filter(String);
    for (const round of rounds){
        myTotalScore += combinationScores[round];
        correctTotalScore += correctScores[round];
    }

    console.log('My total score is: ' + myTotalScore);
    console.log('My alt total score is: ' + correctTotalScore);
});