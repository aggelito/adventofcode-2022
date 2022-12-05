const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    start(data);
});


async function start(input) {
    const inputSections = input.replace(/(\r)/gm, "").split('\n\n');

    const containerInputRows = inputSections[0].split('\n');
    const actionsInput = inputSections[1].split('\n');

    const nrOfColumns = (containerInputRows[0].length + 1) / 4;

    let containerStacks = [];

    //prepare array of container stacks
    for (let y = containerInputRows.length - 2; y >= 0; y--) {
        for (let x = 0; x < nrOfColumns; x++) {
            if (!containerStacks[x]) {
                containerStacks[x] = [];
            }
            let container = containerInputRows[y][1 + (4 * x)];
            if (container != ' ') {
                containerStacks[x].push(container);
            }
        }
    }

    for (let action of actionsInput) {
        if (!action) {
            continue;

        }
        const actionParts = action.split(' ');
        const moveCount = parseInt(actionParts[1]);
        const moveFrom = parseInt(actionParts[3]);
        const moveTo = parseInt(actionParts[5]);

        //part 1
        // for (let i = 0; i < moveCount; i++) {
        // containerStacks[moveTo - 1].push(containerStacks[moveFrom - 1].pop());
        // }

        //part 2
        let movingContainers = [];
        for (let i = 0; i < moveCount; i++) {
            movingContainers.push(containerStacks[moveFrom - 1].pop());
        }
        for (let i = 0; i < moveCount; i++) {
            containerStacks[moveTo - 1].push(movingContainers.pop());
        }
    }

    let result1 = '';
    for (let column = 0; column < nrOfColumns; column++) {
        result1 += containerStacks[column][containerStacks[column].length - 1];
    }
    console.log(`Result: ${result1}`);
}