console.log("AOC 2022 - Day 25: Full of Hot Air");

const splitLines = data => data.split(String.fromCharCode(10));

const map = {
    "2": 2,
    "1": 1,
    "0": 0,
    "-": -1,
    "=": -2
}

const there = requirements => {
    let sum = 0;
    for (let number of requirements) {
        let converted = 0;
        let power = 1;
        while (number.length > 0) {
            let actual = number.slice(-1);
            converted += power * map[actual];
            number = number.slice(0, -1);
            power *= 5;
        }
        sum += converted;
    }
    return sum;
};

const back = number => {
    let converted = "";
    while (number > 0) {
        const remainder = number % 5;
        switch (remainder) {
            case 2:
            case 1:
            case 0:
                converted += remainder;
                break;
            case 3:
                converted += "=";
                //number += 5; (needed when using Math.floor)
                break;
            case 4:
                converted += "-";
                //number += 5; (needed when using Math.floor)
                break;
            default:
                throw new Error("Wrong remainder");
        }
        // number = Math.floor(number / 5);
        // switching to Math.round because of encukou hint
        number = Math.round(number / 5);
    }
    return converted.reverse();
};

const task1 = requirements => {
    const sum = there(requirements);
    return back(sum);
};

let testdata = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

testdata = splitLines(testdata);

console.log("Test data:");
console.log(testdata);

inputdata = splitLines(inputdata);

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(there(testdata), 4890);
doEqualTest(task1(testdata), "2=-1=0");

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");