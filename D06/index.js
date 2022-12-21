console.log("AOC 2022 - Day 6: Tuning Trouble");

const task1 = datastream => {
    for (let i = 4; i < datastream.length; i++) {
        let marker = new Set(datastream.slice(i-4, i));
        if (marker.size === 4) return i;
    }
};

const task2 =  datastream => {
    for (let i = 14; i < datastream.length; i++) {
        let marker = new Set(datastream.slice(i-14, i));
        if (marker.size === 14) return i;
    }
};

let testdata = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

console.log("");

doEqualTest(task1(testdata), 7);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 19);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");