console.log("AOC 2022 - Day 3: Rucksack Reorganization");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data;

const task1 = rucksacks => {
    let priorities = 0;
    for (const r of rucksacks) {
        l = r.length/2;
        a = Array.from(r);
        r1 = R.take(l, a);
        r2 = R.takeLast(l, a);
        common = R.head(r1.intersection(r2));
        if (common.isUpper())
            priorities += ord(common) - 38;
        else
            priorities += ord(common) - 96;
    }
    return priorities;
};

const task2 = rucksacks => {
    let priorities = 0;
    for (let i = 0; i < rucksacks.length; i+=3) {
        a1 = Array.from(rucksacks[i]);
        a2 = Array.from(rucksacks[i+1]);
        a3 = Array.from(rucksacks[i+2]);
        common = R.head(a1.intersection(a2).intersection(a3));
        if (common.isUpper())
            priorities += ord(common) - 38;
        else
            priorities += ord(common) - 96;
    }
    return priorities;
}

let testdata = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 157);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 70);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");