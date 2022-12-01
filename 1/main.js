const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let elfs = data.split('\n\n');
    let elfEnergySums = [];
    for (const elf of elfs){
        const foods = elf.split('\n').filter(Number);
        const energySum = foods.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        elfEnergySums.push(energySum);
    }
    elfEnergySums = elfEnergySums.sort((a,b) => b - a);
    console.log('The first answer to day 1 is: ' + elfEnergySums[0]);
    console.log('The second answer to day 1 is: ' +  (elfEnergySums[0] + elfEnergySums[1] + elfEnergySums[2]));
});