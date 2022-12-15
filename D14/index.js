console.log("AOC 2022 - Day 14: Regolith Reservoir");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const blocked = new Set();
    let maxY = 0;
    for (let line of data) {
        line = line.split(" -> ");
        for (let i = 1; i < line.length; i++) {
            let [startX, startY] = line[i-1].split(",").map(Number);
            let [endX, endY] = line[i].split(",").map(Number);
            if (startY > maxY) maxY = startY;
            if (endY > maxY) maxY = endY;
            if (startX === endX) {
                let y1 = Math.min(startY, endY);
                let y2 = Math.max(startY, endY);
                for (let j = y1; j <= y2; j++) {
                    blocked.add([startX, j].toString());
                }
            } else {
                let x1 = Math.min(startX, endX);
                let x2 = Math.max(startX, endX);
                for (let j = x1; j <= x2; j++) {
                    blocked.add([j, startY].toString());
                }
            }
        }
    }
    return [blocked, maxY];
};

const draw = ([blocked, maxY], grains) => {
    let str = "";
    for (let y = 0; y <= maxY; y++) {
        for (let x = 400; x <= 700; x++) {
            if (blocked.has([x, y].toString()) && grains && grains.has([x, y].toString())) str += ".";
            else if (blocked.has([x, y].toString())) str += "█";
            else str += " ";
        }
        str += "\n";
    }
    console.log(str);
}

const task1 = ([blockedToClone, maxY]) => {
    const blocked = new Set();
    // R.clone doesn't work on sets!! have to do it manually
    for (const x of blockedToClone) blocked.add(x);
    console.log(blocked.size);
    let grains = -1;
    sand: while (true) { // one grain of sand
        grains++;
        let sandX = 500;
        let sandY = 0;
        step: while (true) { // one step
            if (sandY === maxY) return grains;
            for (const [dirX, dirY] of [[0,1], [-1, 1], [1, 1]]) {
                let newX = sandX + dirX;
                let newY = sandY + dirY;
                if (blocked.has([newX, newY].toString())) {
                    continue;
                } else {
                    sandX = newX;
                    sandY = newY;
                    continue step;
                }
            }
            blocked.add([sandX, sandY].toString());
            continue sand;
        }
    }
};

const task2 = ([blocked, maxY]) => {
    console.log(blocked.size);
    let grainSet = new Set();
    let grains = 0;
    maxY++;
    sand: while (!blocked.has("500,0")) { // one grain of sand
        grains++;
        let sandX = 500;
        let sandY = 0;
        step: while (true) { // one step
            if (sandY === maxY) {
                blocked.add([sandX, sandY].toString());
                grainSet.add([sandX, sandY].toString());
                continue sand;
            }
            for (const [dirX, dirY] of [[0,1], [-1, 1], [1, 1]]) {
                let newX = sandX + dirX;
                let newY = sandY + dirY;
                if (blocked.has([newX, newY].toString())) {
                    continue;
                } else {
                    sandX = newX;
                    sandY = newY;
                    continue step;
                }
            }
            blocked.add([sandX, sandY].toString());
            grainSet.add([sandX, sandY].toString());
            continue sand;
        }
    }
    draw([blocked, ++maxY], grainSet)
    return grains;
};

let testdata = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

draw(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

draw(inputdata);

console.log("");

doEqualTest(task1(testdata), 24);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 93);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");