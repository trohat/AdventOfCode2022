console.log("AOC 2022 - Day 9: Rope Bridge");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let motions = [];
    for (const line of data) {
        [dir, count] = line.split(" ");
        motions.push({ dir, count: +count });
    }
    return motions;
};

const task1 = motions => {
    let tailGrid = new Set();
    let head = [0, 0];
    let tail = [0, 0];
    tailGrid.add(tail.toString());
    for (const m of motions) {
        const dir = charsToDirs.get(m.dir);
        for (let i = 0; i < m.count; i++) {
            head[0] += dir.x;
            head[1] += dir.y;
            let move;
            switch (true) {
                case (tail[0] === head[0] && head[1] === tail[1]):
                    break;
                case (Math.abs(tail[0] - head[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1):
                    break;
                case (tail[0] === head[0]):
                    move = Math.sign(head[1] - tail[1]);
                    tail[1] += move;
                    break;
                case (tail[1] === head[1]):
                    move = Math.sign(head[0] - tail[0]);
                    tail[0] += move;
                    break;
                default:
                    moveX = Math.sign(head[0] - tail[0]);
                    moveY = Math.sign(head[1] - tail[1]);
                    tail[0] += moveX;
                    tail[1] += moveY;
                    break;
            }
            tailGrid.add(tail.toString());
        }
    }
    return tailGrid.size;
};

const task2 = motions => {
    let tailGrid = new Set();
    let tailN = 10;
    let tails = [];
    for (let i = 0; i < tailN; i++) {
        tails.push([0, 0]);
    }
    tailGrid.add(tails[tailN - 1].toString());
    for (const m of motions) {
        const dir = charsToDirs.get(m.dir);
        for (let i = 0; i < m.count; i++) {
            tails[0][0] += dir.x;
            tails[0][1] += dir.y;
            let move;
            for (let t = 1; t < tails.length; t++) {
                switch (true) {
                    case (tails[t][0] === tails[t-1][0] && tails[t-1][1] === tails[t][1]):
                        break;
                    case (Math.abs(tails[t][0] - tails[t-1][0]) <= 1 && Math.abs(tails[t-1][1] - tails[t][1]) <= 1):
                        break;
                    case (tails[t][0] === tails[t-1][0]):
                        move = Math.sign(tails[t-1][1] - tails[t][1]);
                        tails[t][1] += move;
                        break;
                    case (tails[t][1] === tails[t-1][1]):
                        move = Math.sign(tails[t-1][0] - tails[t][0]);
                        tails[t][0] += move;
                        break;
                    default:
                        moveX = Math.sign(tails[t-1][0] - tails[t][0]);
                        moveY = Math.sign(tails[t-1][1] - tails[t][1]);
                        tails[t][0] += moveX;
                        tails[t][1] += moveY;
                        break;
                }
            }
            tailGrid.add(tails[tailN - 1].toString());
        }
    }
    return tailGrid.size;
};

let testdata = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

let secondtestdata = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

testdata = prepare(splitLines(testdata));
secondtestdata = prepare(splitLines(secondtestdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 13);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(secondtestdata), 36);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");