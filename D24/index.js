console.log("AOC 2022 - Day 24: Blizzard Basin");

const splitLines = data => data.split(String.fromCharCode(10));

class Valley {
    constructor(map) {
        this.map = map;
    }

    write(floor, row, col, value) {
        floor[row] = floor[row] || [];
        if (value === "#") {
            floor[row][col] = value;
        } else {
            floor[row][col] = floor[row][col] || [];
            if (value !== ".")
                floor[row][col].push(value);
        }
    }

    read(floor, row, col) {
        if (row in floor && col in floor[row]) {
            return floor[row][col];
        }
    }

    buildFirstFloor() {
        const floor = [];
        this.map.forEach((line, lineIndex) => {
            floor.push([]);
            [...line.split("")].forEach((char, charIndex) => {
                this.write(floor, lineIndex, charIndex, char);
            });
        });
        return floor;
    }

    buildNextFloor(lastFloor) {
        const floor = [];
        this.map.forEach((line, lineIndex) => {
            floor.push([]);
            [...line.split("")].forEach((char, charIndex) => {
                if (char === "#") {
                    this.write(floor, lineIndex, charIndex, char);
                } else {
                    this.write(floor, lineIndex, charIndex, ".");
                }
            });
        });
        lastFloor.forEach((line, lineIndex) => {
            line.forEach((field, fieldIndex) => {
                if (Array.isArray(field)) {
                    for (const blizzard of field) {
                        const dirs = graphicsToDirs.get(blizzard);
                        let newLine = dirs.y + lineIndex;
                        let newField = dirs.x + fieldIndex;
                        if (newField < 1) newField = lastFloor[0].length - 2;
                        if (newField > lastFloor[0].length - 2) newField = 1;
                        if (newLine < 1) newLine = lastFloor.length - 2;
                        if (newLine > lastFloor.length - 2) newLine = 1;
                        this.write(floor, newLine, newField, blizzard);
                    }
                }
            });
        });
        return floor;
    }
}

const task1 = map => {
    const valley = new Valley(map);
    let lastFloor = valley.buildFirstFloor();
    let states = new Set();
    states.add([1, 0].toString());
    for (let steps = 1; ; steps++) {
        const floor = valley.buildNextFloor(lastFloor);
        let newStates = new Set();
        for (const state of states) {
            const [stateX, stateY] = state.split(",");
            for (const dir of generalDirs.concat([{ x: 0, y: 0 }])) {
                const newX = +stateX + dir.x;
                const newY = +stateY + dir.y;
                if (newY === floor.length - 1 && newX === floor[0].length - 2) {
                    return steps;
                }
                const newField = valley.read(floor, newY, newX);
                if (Array.isArray(newField) && newField.length === 0) {
                    newStates.add([newX, newY].toString());
                }
            }
        }
        lastFloor = floor;
        states = newStates;
    }
};

const task2 = map => {
    const valley = new Valley(map);
    let lastFloor = valley.buildFirstFloor();
    let states = new Set();
    states.add([1, 0].toString());
    let wentBack = false;
    let goingBack = false;
    main: for (let steps = 1; ; steps++) {
        const floor = valley.buildNextFloor(lastFloor);
        let newStates = new Set();
        for (const state of states) {
            const [stateX, stateY] = state.split(",");
            for (const dir of generalDirs.concat([{ x: 0, y: 0 }])) {
                const newX = +stateX + dir.x;
                const newY = +stateY + dir.y;
                if (newY === floor.length - 1 && newX === floor[0].length - 2 && wentBack) {
                    return steps;
                }
                if (newY === 0 && newX === 1 && goingBack && !wentBack) {
                    states = new Set();
                    states.add([1, 0].toString());
                    lastFloor = floor;
                    wentBack = true;
                    continue main;
                }
                if (newY === floor.length - 1 && newX === floor[0].length - 2 && !goingBack) {
                    states = new Set();
                    states.add([floor[0].length - 2, floor.length - 1].toString());
                    lastFloor = floor;
                    goingBack = true;
                    continue main;
                }
                const newField = valley.read(floor, newY, newX);
                if (Array.isArray(newField) && newField.length === 0) {
                    newStates.add([newX, newY].toString());
                }
            }
        }
        lastFloor = floor;
        states = newStates;
    }
};

let testdata0 = `#.#####
#.....#
#>....#
#.....#
#...v.#
#.....#
#####.#`;

let testdata1 = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;

testdata0 = splitLines(testdata0);
testdata1 = splitLines(testdata1);

console.log("Test data:");
console.log(testdata0);

inputdata = splitLines(inputdata);

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata0), 10);
doEqualTest(task1(testdata1), 18);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata1), 54);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");