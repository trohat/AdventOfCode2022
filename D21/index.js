console.log("AOC 2022 - Day 21: Monkey Math");

class HumnError extends Error {
    constructor(message) {
        super(message);
        this.name = "Humn found";
    }
}

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let monkeys = {};
    for (const line of data) {
        let [monkey, operation] = line.split(": ");
        if (/\d+/.test(operation)) {
            monkeys[monkey] = { value: +operation, computed: true };
        } else {
            let [first, op, second] = operation.split(" ");
            monkeys[monkey] = { first, op, second };
        }
    }
    return monkeys;
};

const task1 = monkeysToClone => {
    const computeMonkey = monkeyStr => {
        let monkey = monkeys[monkeyStr];
        if (monkey.computed === true) return monkey.value;
        let firstVal = computeMonkey(monkey.first);
        let secondVal = computeMonkey(monkey.second);
        let val;
        switch (monkey.op) {
            case "+":
                val = firstVal + secondVal;
                break;
            case "-":
                val = firstVal - secondVal;
                break;
            case "*":
                val = firstVal * secondVal;
                break;
            case "/":
                val = firstVal / secondVal;
                break;
            default:
                throw new Exception("Unknown op");
        }
        monkey.value = val;
        monkey.computed = true;
        return val;
    }

    let monkeys = R.clone(monkeysToClone);
    let x = computeMonkey("root");
    return x;
};

const task2 = monkeysToClone => {
    const computeMonkey = monkeyStr => {
        let monkey = monkeys[monkeyStr];
        monkeys.humn.value = NaN;
        if (monkey.computed === true) return monkey.value;
        let firstVal = computeMonkey(monkey.first);
        let secondVal = computeMonkey(monkey.second);
        let val;
        switch (monkey.op) {
            case "+":
                val = firstVal + secondVal;
                break;
            case "-":
                val = firstVal - secondVal;
                break;
            case "*":
                val = firstVal * secondVal;
                break;
            case "/":
                val = firstVal / secondVal;
                break;
            default:
                throw new Exception("Unknown op");
        }
        monkey.value = val;
        monkey.computed = true;
        return val;
    }

    let monkeys = R.clone(monkeysToClone);
    computeMonkey("root");

    let toGo = "root";
    while (true) {
        let monkey = monkeys[toGo];
        if (toGo === "humn") return monkey.result;
        let firstM = monkeys[monkey.first];
        let secondM = monkeys[monkey.second];
        let firstVal = firstM.value;
        let secondVal = secondM.value;
        if (_.isNaN(firstVal)) {
            if (toGo === "root") {
                firstM.result = secondVal;
            } else {
                switch (monkey.op) {
                    case "+":
                        firstM.result = monkey.result - secondVal;
                        break;
                    case "-":
                        firstM.result = monkey.result + secondVal;
                        break;
                    case "*":
                        firstM.result = monkey.result / secondVal;
                        break;
                    case "/":
                        firstM.result = monkey.result * secondVal;
                        break;
                    default:
                        throw new Exception("Unknown op");
                }
            }
            toGo = monkey.first;
        } else if (_.isNaN(secondVal)) {
            if (toGo === "root") {
                secondM.result = firstVal;
            } else {
                switch (monkey.op) {
                    case "+":
                        secondM.result = monkey.result - firstVal;
                        break;
                    case "-":
                        secondM.result = firstVal - monkey.result;
                        break;
                    case "*":
                        secondM.result = monkey.result / firstVal;
                        break;
                    case "/":
                        secondM.result = firstVal / monkey.result;
                        break;
                    default:
                        throw new Exception("Unknown op");
                }
            }
            toGo = monkey.second;
        }
    }
}


let testdata = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 152);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 301);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");