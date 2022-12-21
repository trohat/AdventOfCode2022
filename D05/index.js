console.log("AOC 2022 - Day 5: Supply Stacks");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = (data, test) => {
    let crates;
    if (test === "test") {
        crates = [[], ["Z", "N"], ["M", "C", "D"], ["P"]];
    } else {
        crates = [[], ["R", "P", "C", "D", "B", "G"], ["H", "V", "G"], ["N", "S", "Q", "D", "J", "P", "M"], ["P", "S", "L", "G", "D", "C", "N", "M"],
        ["J", "B", "N", "C", "P", "F", "L", "S"], ["Q", "B", "D", "Z", "V", "G", "T", "S"], ["B", "Z", "M", "H", "F", "T", "Q"],
        ["C", "M", "D", "B", "F"], ["F", "C", "Q", "G"]];
    }
    let moves = [];
    let re = /move (\d+) from (\d+) to (\d+)/;
    for (const line of data) {
        if (re.test(line)) {
            [, count, from, to] = re.exec(line);
            moves.push({ count: +count, from: +from, to: +to });
        }
    }
    return [crates, moves];
};

const task1 = ([ cratesToClone, moves ]) => {
    crates = R.clone(cratesToClone);
    for (const move of moves) {
        toMove = R.takeLast(move.count, crates[move.from]);
        crates[move.from] = R.dropLast(move.count, crates[move.from])
        crates[move.to] = R.concat(crates[move.to], R.reverse(toMove));
    }
    return crates.reduce((acc, s) => acc + R.last(s));
};

const task2 = ([ crates, moves ]) => {
    for (const move of moves) {
        toMove = R.takeLast(move.count, crates[move.from]);
        crates[move.from] = R.dropLast(move.count, crates[move.from])
        crates[move.to] = R.concat(crates[move.to], toMove);
        
    }
    return crates.reduce((acc, s) => acc + R.last(s));
};

let testdata = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

testdata = prepare(splitLines(testdata), "test");

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), "CMZ");

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), "MCD");
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");