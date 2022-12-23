console.log("AOC 2022 - Day 15: Beacon Exclusion Zone");

Set.prototype.difference = function(other) {
    return new Set([...this].filter(element => !other.has(element)));
}

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
    const sensors = [];
    for (const line of data) {
        [_, sx, sy, bx, by] = re.exec(line);
        [sx, sy, bx, by] = [sx, sy, bx, by].map(Number);
        sensors.push({ sx, sy, bx, by });
    }
    return sensors;
};

const task1 = (sensors, line) => {
    let positions = new Set();
    const sPositions = new Set()
    const bPositions = new Set()
    for (const s of sensors) {
        const { sx, sy, bx, by } = s;
        if (sy === line) sPositions.add(sx);
        if (by === line) bPositions.add(bx);
        const manhattan = Math.abs(sx - bx) + Math.abs(sy - by);
        const yDiff = Math.abs(sy - line);
        const xDiff = manhattan - yDiff;
        if (xDiff >= 0) {
            for (let i = (sx - xDiff); i <= (sx + xDiff); i++) {
                positions.add(i);
            }
        }
    }
    positions = positions.difference(sPositions);
    positions = positions.difference(bPositions);
    return positions.size;
};

// just helper function, thought I could have used it in task 2 (didn't happen)
const findAtLine = (sensors, line) => {
    let positions = new Set();
    const sPositions = new Set()
    const bPositions = new Set()
    for (const s of sensors) {
        const { sx, sy, bx, by } = s;
        if (sy === line) sPositions.add(sx);
        if (by === line) bPositions.add(bx);
        const manhattan = Math.abs(sx - bx) + Math.abs(sy - by);
        const yDiff = Math.abs(sy - line);
        const xDiff = manhattan - yDiff;
        if (xDiff >= 0) {
            const fromX = Math.max(sx - xDiff, 0);
            const toX = Math.min(sx + xDiff, 4000000);
            for (let i = fromX; i <= toX; i++) {
                positions.add(i);
            }
        }
    }
    positions = positions.difference(sPositions);
    positions = positions.difference(bPositions);
    return positions.size;
};

const task2 = (sensors, maxCoord) => {
    lines = [];
    for (let i = 0; i <= maxCoord; i++) {
        lines.push([]);
    }
    console.log("Setup done.");
    for (const s of sensors) {
        const { sx, sy, bx, by } = s;
        const manhattan = Math.abs(sx - bx) + Math.abs(sy - by);
        const fromY = Math.max(sy - manhattan, 0);
        const toY = Math.min(sy + manhattan, maxCoord);
        for (let line = fromY; line <= toY; line++) {
            const yDiff = Math.abs(sy - line);
            const xDiff = manhattan - yDiff;
            if (xDiff >= 0) { // always true
                const fromX = Math.max(sx - xDiff, 0);
                const toX = Math.min(sx + xDiff, maxCoord);
                let actualLine = lines[line];
                let actualPair;
                if (actualLine.length === 0) {
                    actualLine.push([fromX, toX]);
                } else {
                    const left = actualLine.find(([x1, x2]) => fromX >= x1 && fromX <= x2 + 1);
                    const right = actualLine.find(([x1, x2]) => toX >= x1 - 1 && toX <= x2);
                    if (left === undefined && right === undefined) {
                        actualLine.push([fromX, toX]);
                        actualPair = actualLine[actualLine.length - 1];
                    }
                    else if (left === right) {
                        continue;
                    }
                    else if (left === undefined) {
                        // console.log("op1 on line", line);
                        right[0] = fromX;
                        actualPair = right;
                    }
                    else if (right === undefined) {
                        // console.log("op2 on line", line);
                        left[1] = toX;
                        actualPair = left;
                    } else { // no undefined, left !== right
                        // console.log("op3 on line", line);
                        // console.log(actualLine.toString());
                        left[1] = right[1];
                        actualPair = left;
                    }

                    // console.log("fromX:", fromX, "toX:", toX, "pair:", actualPair.toString(), "-----", actualLine.toString());
                    actualLine = actualLine.filter((pair) => {
                        if (pair === actualPair) return true;
                        const x1 = pair[0];
                        const x2 = pair[1];
                        return !(x1 >= actualPair[0] && x2 <= actualPair[1]);
                    });
                    lines[line] = actualLine;
                    // console.log(actualPair.toString(), "-----", actualLine.toString());
                }
            }
        }
    }
    // console.log(lines);
    const yIndex = lines.findIndex(l => l.length === 2);
    const interestingLine = lines[yIndex];
    const xIndex = interestingLine[0][1] + 1;
    console.assert(xIndex === interestingLine[1][0] - 1);
    return xIndex * 4000000 + yIndex;
}

let testdata = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata, 10), 26);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata, 2000000));
// console.log("Task 1: " + findAtLine(inputdata, 2000000));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata, 20), 56000011);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata, 4000000));
console.timeEnd("Task 2");