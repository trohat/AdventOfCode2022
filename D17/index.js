console.log("AOC 2022 - Day 17: Pyroclastic Flow");

const splitLines = data => data.split("");

const prepare = data => data;

const S1 = [
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
];

const S2 = [
    [4, 4],
    [5, 3],
    [5, 4],
    [5, 5],
    [6, 4],
];

const S3 = [
    [4, 3],
    [4, 4],
    [4, 5],
    [5, 5],
    [6, 5],
];

const S4 = [
    [4, 3],
    [5, 3],
    [6, 3],
    [7, 3],
];

const S5 = [
    [4, 3],
    [4, 4],
    [5, 3],
    [5, 4],
];

const findHighest = chamber => {
    if (Object.keys(chamber).length === 0) return 0;
    return Math.max(...Object.keys(chamber));
}

const canMoveTo = (shape, dir, grid) => {
    shape = shape.map(rock => [rock[0] + dir[0], rock[1] + dir[1]]);
    if (shape.some(rock => rock[1] < 1)) return false;
    if (shape.some(rock => rock[1] > 7)) return false;
    if (shape.some(rock => rock[0] < 1)) return false;
    for (const rock of shape) {
        if (rock[0] in grid && grid[rock[0]].has(rock[1])) return false;
    }
    return true;
}

const moveTo = (shape, dir) => shape.map(rock => [rock[0] + dir[0], rock[1] + dir[1]]);

const makeChamberString = chamber => {
    let highest = findHighest(chamber);
    let all = new Set();
    let str = "";
    while (all.size < 7) {
        let arr = [...chamber[highest]].sort();
        for (const el of arr) {
            all.add(el);
        }
        str += arr.join("") + "-";
        highest--;
    }
    return str.slice(0, str.length - 1);
}


const task1 = pattern => {
    const chamber = {};
    let rocks = 1;
    let rockShape = 4;
    const rockShapes = [S1, S2, S3, S4, S5];
    const patternLength = pattern.length
    let jetIndex = patternLength - 1;
    while (rocks < 2023) {
        // console.log(rocks);
        rocks++;
        rockShape = (++rockShape) % 5;
        let rock = R.clone(rockShapes[rockShape]);
        let fallsFrom = findHighest(chamber);
        rock = rock.map(r => [r[0] + fallsFrom, r[1]]);
        let resting = false;
        while (!resting) {
            let dir;
            jetIndex = (++jetIndex) % patternLength;
            switch (pattern[jetIndex]) {
                case "<":
                    dir = [0, -1];
                    break;
                case ">":
                    dir = [0, 1];
                    break;
                default:
                    throw new Exception("Error in pattern.");
            }
            if (canMoveTo(rock, dir, chamber)) {
                rock = moveTo(rock, dir);
            }
            if (canMoveTo(rock, [-1, 0], chamber)) {
                rock = moveTo(rock, [-1, 0]);
            } else {
                resting = true;
            }
        }
        for (const r of rock) {
            chamber[r[0]] = chamber[r[0]] || new Set();
            chamber[r[0]].add(r[1]);
        }
    }
    return findHighest(chamber);
};

const task2 = pattern => {
    const repeating = new Set();
    const patterns = new Map();
    const rockCounts = new Map();
    const highestCounts = new Map();
    let skipLines;
    const chamber = {};
    let rocks = 0;
    let rockShape = 4;
    const rockShapes = [S1, S2, S3, S4, S5];
    const patternLength = pattern.length;
    let jetIndex = patternLength - 1;
    let cycles = 1000000000000;
    let countCycles = true;
    while (rocks < cycles) {
        // console.log(rocks);
        rocks++;
        if (countCycles) {
            if (!repeating.has([rockShape, jetIndex].toString())) {
                repeating.add([rockShape, jetIndex].toString())
            } else {
                highest = findHighest(chamber);
                //console.log(rockShape, jetIndex, rocks, highest);
                const chamberString = makeChamberString(chamber);
                //console.log(chamberString);
                const state = [rockShape, jetIndex].toString();
                if (!patterns.has(state)) {
                    patterns.set(state, chamberString);
                    rockCounts.set(state, rocks);
                    highestCounts.set(state, highest);
                } else if (patterns.get(state) === chamberString) {
                    console.log("Hooray!");
                    const rocksDiff = rocks - rockCounts.get(state);
                    const remaining = cycles - rocks;
                    const rest = remaining % rocksDiff;
                    cycles = rest + rocks;
                    const skip = Math.floor(remaining / rocksDiff);
                    skipLines = skip * (findHighest(chamber) - highestCounts.get(state));
                    countCycles = false;
                }
            }
        }

        rockShape = (++rockShape) % 5;
        let rock = R.clone(rockShapes[rockShape]);
        let fallsFrom = findHighest(chamber);
        rock = rock.map(r => [r[0] + fallsFrom, r[1]]);
        let resting = false;
        while (!resting) {
            let dir;
            jetIndex = (++jetIndex) % patternLength;
            switch (pattern[jetIndex]) {
                case "<":
                    dir = [0, -1];
                    break;
                case ">":
                    dir = [0, 1];
                    break;
                default:
                    throw new Exception("Error in pattern.");
            }
            if (canMoveTo(rock, dir, chamber)) {
                rock = moveTo(rock, dir);
            }
            if (canMoveTo(rock, [-1, 0], chamber)) {
                rock = moveTo(rock, [-1, 0]);
            } else {
                resting = true;
            }
        }
        for (const r of rock) {
            chamber[r[0]] = chamber[r[0]] || new Set();
            chamber[r[0]].add(r[1]);
        }
        if (rocks === cycles - 1) 
        console.log(makeChamberString(chamber));
    }
    console.log(makeChamberString(chamber));
    return findHighest(chamber) + skipLines;
};

let testdata = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 3068);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 1514285714288);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");