console.log("AOC 2022 - Day 4: Camp Cleanup");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const assignments = [];
    const re = /(\d+)-(\d+),(\d+)-(\d+)/;
    for (const d of data) {
        [ , firstStart, firstEnd, secondStart, secondEnd ] = re.exec(d);
        assignments.push({ firstStart: +firstStart, firstEnd: +firstEnd, secondStart: +secondStart, secondEnd: +secondEnd });
    }
    return assignments;
};

const task1 = assignments => {
    let contains = 0;
    for (const a of assignments) {
        if (a.firstStart >= a.secondStart && a.firstEnd <= a.secondEnd || a.firstStart <= a.secondStart && a.firstEnd >= a.secondEnd) contains++;
    }
    return contains;
};

const task2 = assignments => {
    let overlaps = 0;
    for (const a of assignments) {
        if (a.firstEnd < a.secondStart || a.firstStart > a.secondEnd) ;
        else overlaps++;
    }
    return overlaps;
};

let testdata = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 2);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 4);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");