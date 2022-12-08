const fs = require('fs');

fs.readFile('example-input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    start(data);
});


let experimentalSum = 0;

async function start(input) {
    // console.log(input);

    const inputRows = input.replace(/(\r)/gm, "").split('\n').filter(String);


    let currentDir = {
        dirs: [],
        files: [],
        parent: null
    };

    let dirs = currentDir;

    for (const line of inputRows) {
        // console.log(line);
        const [p1, p2, p3] = line.split(" ");

        if (p2 == 'cd' && p3 != '..') {
            console.log('cd');
            if (!currentDir.dirs[p3]) {
                currentDir.dirs[p3] = {
                    parent: currentDir,
                    files: [],
                    dirs: [],
                    name: p3
                }
            }
            currentDir = currentDir.dirs[p3];
        }

        if (p1 == 'dir' && !currentDir.dirs[p2]) {
            currentDir.dirs[p2] = {
                parent: currentDir,
                files: [],
                dirs: [],
                name: p2
            }
        }

        if (parseInt(p1)) {
            currentDir.files.push({
                fileSize: parseInt(p1),
                fileName: p2
            });
        }

    }

    let sum = calculateDirSize(dirs.dirs['/']);


    // for (let dir of dirs.dirs['/'].dirs){
    //     console.log('dir');
    // }


    // console.log(dirs.dirs['/'].dirs);
    let p1sum = 0;
    // let dirsUnder = getDirsUnder(dirs.dirs['/'], p1sum);


    console.log(sum);
    console.log(experimentalSum);

}

function getDirsUnder(dir, sum) {
    // if(dir.size > 100000){
    //     return 0;
    // }

    // console.log(dir.parent);

    
    
    for (let key in dir.dirs) {
        // currentDirSize += calculateDirSize(dir.dirs[key]);
        console.log('getDirsUnder(dir.dirs[key])');
    }

    return dir.size;
}

function calculateDirSize(dir) {
    // let currentDirSize = 0;

    //get dirs and add to dirs array



    // let fileSize = 0;
    //calculate size of all files
    //for files
    // currentDirSize += fileSize;

    // if (dirs.length == 0) {
    //     return currentDirSize;
    // }

    // while(dirs.length){
    //     size += calculateDirSize(commands, dirs.pop());
    // }

    let currentDirSize = 0;

    // console.log(dir.dirs.length);

    for (file of dir.files) {
        currentDirSize += file.fileSize;
    }

    let subDirsSize = 0;
    let subdirSizes = [];

    

    for (let key in dir.dirs) {
        // currentDirSize += calculateDirSize(dir.dirs[key]);
        let subDirSize = calculateDirSize(dir.dirs[key]);
        subDirsSize += subDirSize
        subdirSizes.push(subDirSize);

    }

    currentDirSize = currentDirSize + subDirsSize;




    //save size for later
    dir.size = currentDirSize;

    

    return currentDirSize;
}