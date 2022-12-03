const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    start(data);
});

const alphabet = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

async function start(input) {


    const backpacks = input.replace(/(\r)/gm, "").split('\n').filter(String);
    let prioritySum = 0;
    let badgePrioritySum = 0;
    for (const backpack of backpacks) {
        let compartments = [
            backpack.slice(0, backpack.length / 2),
            backpack.slice(backpack.length / 2, backpack.length),
        ];

        const regex = new RegExp('[' + compartments[0] + ']', 'g');
        const itemFound = Array.from(new Set(compartments[1].match(regex)));

        for (const item of itemFound) {
            prioritySum += (alphabet.indexOf(item) + 1);
        }

        //badge stuff
        elfIndex = backpacks.indexOf(backpack);
        //calculate badge priority every 3 elfs
        if ((elfIndex + 1) % 3 === 0) {
            const elfBackpack1 = backpacks[elfIndex];
            const elfBackpack2 = backpacks[elfIndex - 1];
            const elfBackpack3 = backpacks[elfIndex - 2];

            //find badge
            const badgeRegex = new RegExp('[' + elfBackpack1 + ']', 'g');

            //check what items elf 1 has in common with elf 2 and 3
            const commonItems1 = Array.from(new Set(elfBackpack2.match(badgeRegex))).toString().replace(/,/g, '');
            const commonItems2 = Array.from(new Set(elfBackpack3.match(badgeRegex))).toString().replace(/,/g, '');

            //check what items elf 2 and 3 has in common
            const badgeRegex1 = new RegExp('[' + commonItems1 + ']', 'g');
            let match = commonItems2.match(badgeRegex1).toString();

            badgePrioritySum += (alphabet.indexOf(match) + 1);
        }
    }
    console.log('Priority sum: ' + prioritySum);
    console.log('Badge priority sum: ' + badgePrioritySum);
}