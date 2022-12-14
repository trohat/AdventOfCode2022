console.log("AOC 2022 - Day 13: Distress Signal");

const splitLines = data => data.split(String.fromCharCode(10) + String.fromCharCode(10));

const prepare = data => {
    return data.map(d => d.split("\n").map(l => JSON.parse(l)));
};

const runNumberComparison = (n1, n2) => {
    if (n1 < n2) return true;
    if (n2 < n1) return false;
    return undefined;
}

const runComparison = (p1, p2) => {
    let i1 = 0;
    let i2 = 0;
    let result;
    while (true) {
        if (Array.isArray(p1[i1]) && Array.isArray(p2[i2])) {
            result = runComparison(p1[i1], p2[i2]);
        } else if (_.isNumber(p1[i1]) && _.isNumber(p2[i2])) {
            result = runNumberComparison(p1[i1], p2[i2])
        } else if (Array.isArray(p1[i1]) && _.isNumber(p2[i2])) {
            result = runComparison(p1[i1], Array.of(p2[i2]))
        } else if (_.isNumber(p1[i1]) && Array.isArray(p2[i2])) {
            result = runComparison(Array.of(p1[i1]), p2[i2])
        } else if (p1[i1] === undefined && p2[i2] !== undefined) {
            return true;
        } else if (p1[i1] !== undefined && p2[i2] === undefined) {
            return false;
        } else if (p1[i1] === undefined && p2[i2] === undefined) {
            return undefined;
        } else {
            throw "Unreachable";
        }
        if (result === true) return true;
        if (result === false) return false;
        i1++;
        i2++;
    }
}

const task1 = packets => {
    let score = 0;

    packets.forEach((packet, index) => {
        if (runComparison(packet[0], packet[1])) {
            // console.log(index + 1);
            score += index + 1;
        }
    })
    return score;
};

const task2 = packets => {
    packets = packets.flat();
    const divider1 = [[2]];
    const divider2 = [[6]];

    packets.push(divider1, divider2);

    sortFn = (p1, p2) => {
        let result = runComparison(p1, p2);
        if (result === true) return -1;
        if (result === false) return 1;
        return 0;
    }

    packets.sort(sortFn);

    return (packets.indexOf(divider1) + 1) * (packets.indexOf(divider2) + 1);
}

let testdata = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

testdata = prepare(splitLines(testdata));

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

doEqualTest(task2(testdata), 140);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");