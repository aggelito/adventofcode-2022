const fs = require('fs');

fs.readFile('example-input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    start(data);
});


async function start(input){
    const inputSections = input.replace(/(\r)/gm, "").split('\n\n');

    const containerInputRows = inputSections[0].split('\n');
    const actionsInput = inputSections[1].split('\n');

    const nrOfColumns = (containerInputRows[0].length + 1) / 4;

    console.log(nrOfColumns);

    //prepare array of container stacks
    for (const containerRow of containerInputRows){
        for(let i = 0; i < nrOfColumns; i++){

        }
    }
}