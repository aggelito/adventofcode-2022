const fs = require('fs');

fs.readFile('example-input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    start(data);
});


async function start(input){
    console.log(input);
}