const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    start(data);
});

async function start(input) {
    let buffer = input;

    const first = await findMessageMarker(buffer, 4);
    const second = await findMessageMarker(buffer, 14);

    console.log(`Part 1 first marker: ${first}`);
    console.log(`Part 2 first marker: ${second}`);
}

async function findMessageMarker(buffer, len){
    let firstMarkerPosition = 0;
    for (let i = 0; i < buffer.length - (len-1); i++) {
        const bufferRange = buffer.substring(i, i + len);
        const characters = bufferRange.split('');
        const uniqueCharacters = characters.filter((el, index, arr) => {
            return index == arr.indexOf(el);
        });
        if(uniqueCharacters.length === len) {
            firstMarkerPosition = i + len;
            return firstMarkerPosition;
        }
    }
}