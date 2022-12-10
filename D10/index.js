console.log("AOC 2022 - Day 10: Cathode-Ray Tube");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const instructions = [];
    for (const line of data) {
        instructions.push(line.split(" "))
        if (instructions.at(-1)[1])
            instructions.at(-1)[1] = +instructions.at(-1)[1];
    }
    return instructions;
};

const task1 = instructions => {
    const testCycle = () => {
        if ([20,60,100,140,180,220].includes(cycles)) {
            signal += register * cycles;
        }
    }
    let register = 1;
    let cycles = 0;
    let signal = 0;
    for (const inst of instructions) {
        switch (inst[0]) {
            case "noop":
                cycles++;
                testCycle();
                break;
            case "addx":
                cycles++;
                testCycle();
                cycles++;
                testCycle();
                register += inst[1];
                break;
        } 
    }
    return signal;
};

const task2 = instructions => {
    let darks = [];
    const testCycle = () => {
        if (cycles % 40 === register || cycles % 40 === register + 1 || cycles % 40 === register - 1) {
            darks.push(cycles);
        }
    }
    let register = 1;
    let cycles = 0;
    for (const inst of instructions) {
        switch (inst[0]) {
            case "noop":
                testCycle();
                cycles++;
                break;
            case "addx":
                testCycle();
                cycles++;
                testCycle();
                cycles++;
                register += inst[1];
        } 
    }
    let string = "";
    for (let i = 0; i < 240; i++) {
        if (i % 40 === 0) {
            string += "\n";
        }
        if (darks.includes(i)) string += "#";
        else string += ".";
    }
    console.log(string);
};

let testdata = `noop
addx 3
addx -5`;

testdata = prepare(splitLines(testdata2));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 13140);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), undefined);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");