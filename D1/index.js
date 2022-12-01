console.log("AOC 2022 - Day 1: Calorie Counting");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(Number);

const task1 = calories => {
    let results = [];
    let elf = 0;;
    for (const cal of calories) {
        if (cal === 0) {
            results = R.append(elf, results);
            elf = 0;
        }
        else {
            elf += cal;
        }
    }
    results = R.append(elf, results);
    return _.max(results);
};

const task2 = calories => {
    let results = [];
    let elf = 0;;
    for (let cal of calories) {
        if (cal === 0) {
            results.push(elf);
            elf = 0;
        }
        else {
            elf += cal;
        }
    }
    results.push(elf);
    results = R.sort((a, b) => b - a, results);
    return R.sum(R.take(3, results));
};

// ehmmm, Array.prototype.push is much faster than R.append

let testdata = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

testdata = prepare(splitLines(testdata));

console.log("Test calories:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input calories:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 24000);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 45000);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");