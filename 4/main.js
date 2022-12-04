const fs = require('fs');

fs.readFile('example-input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    start(data);
});

async function start(input) {
    const elfPairs = input.split('\n',).filter(String);

    let fullyOverlappingSections = 0;
    let overlappingSections = 0;
    for (const elfPair of elfPairs) {
        const elfs = elfPair.split(',');
        let elf1MinMax = elfs[0].split('-').map(i => Number(i));
        let elf2MinMax = elfs[1].split('-').map(i => Number(i));

        if (
            (elf1MinMax[0] >= elf2MinMax[0] && elf1MinMax[1] <= elf2MinMax[1]) ||
            (elf2MinMax[0] >= elf1MinMax[0] && elf2MinMax[1] <= elf1MinMax[1])
        ) {
            fullyOverlappingSections++;
        }

        //wanted to solve with if statements. got lazy and did this instead
        elf1Sections = [];
        let n = elf1MinMax[0];
        while (n <= elf1MinMax[1]) {
            elf1Sections.push(n);
            n++;
        }

        let m = elf2MinMax[0];
        while (m <= elf2MinMax[1]) {
            if (elf1Sections.includes(m)) {
                overlappingSections++;
                break;
            }
            m++;
        }
    }

    console.log('Fully overlapping sections: ' + fullyOverlappingSections);
    console.log('Overlapping sections: ' + overlappingSections);
}