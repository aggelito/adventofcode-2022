const fs = require('fs');
const { serialize } = require('v8');

fs.readFile('example-input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    start(data);
});

async function start(input){
    console.log(input);

    const inputRows = input.replace(/(\r)/gm, "").split('\n').filter(String);

    const structure = {
    };
    let currentDir = {};
    for (const line of inputRows) {
        console.log(line);
        const [p1, p2, p3] = line.split(" ");

        if(p2 === 'cd' && p3 != '..') {
            if(!structure[p3]) {
                structure[p3] = {
                    parent: currentDir,
                    dirs: [],
                    files: [] // file sizes
                }
                console.log(`${p3}`);
            } 
            currentDir = structure[p3];
        }

        if(p1 === 'dir') {
            currentDir.dirs.push(p2)
        }
        
        if(parseInt(p1)) {
            currentDir['files'].push({fileName: p2, fileSize: parseInt(p1)})
        }

        if(p3 === '..') {
            currentDir = currentDir.parent;
        }

    }

    calculateDirSize(structure);
    // console.log(structure['/'].files)
}

function calculateDirSize(dirs){
    let currentDirSize = 0;
    let dirs = [];

    //get dirs and add to dirs array



    let fileSize = 0;
    //calculate size of all files
    //for files
    currentDirSize += fileSize;

    if(dirs.length == 0){
        return currentDirSize;
    }

    while(dirs.length){
        size += calculateDirSize(commands, dirs.pop());
    }

    return currentDirSize;
}