console.log("AOC 2022 - Day 11: Monkey in the Middle");

const splitLines = data => data.split(String.fromCharCode(10) + String.fromCharCode(10));

const prepare = data => {
    let monkeys = [];
    for (let monkey of data) {
        monkey = monkey.split("\n");
        [, number] = /(\d+)/.exec(monkey[0]);
        [, items] = /((?:\d+(?:, )?)+)/.exec(monkey[1]);
        items = items.split(", ").map(Number);
        [, op, n] = /new = old ([*+\/-]) (\d+|old)/.exec(monkey[2]);
        if (/\d+/.exec(n)) n = +n;
        [, divisible] = /divisible by (\d+)/.exec(monkey[3]);
        [, ifTrue] = /If true: throw to monkey (\d+)/.exec(monkey[4]);
        [, ifFalse] = /If false: throw to monkey (\d+)/.exec(monkey[5]);
        monkeys.push({ number: +number, items, op, n, divisible: +divisible, ifTrue: +ifTrue, ifFalse: +ifFalse, inspects: 0 });
    }
    return monkeys;
};;

const task1 = monkeysToClone => {
    monkeys = R.clone(monkeysToClone);
    for (let i = 0; i < 20; i++) {
        for (const monkey of monkeys) {
            for (let item of monkey.items) {
                monkey.inspects++;
                switch (monkey.op) {
                    case "+":
                        item += monkey.n;
                        break;
                    case "-":
                        item -= monkey.n;
                        break;
                    case "*":
                        if (monkey.n === "old") {
                            item *= item;
                        } else {
                            item *= monkey.n;
                        }
                        break;
                    case "/":
                        item /= monkey.n;
                        break;
                }
                item = Math.floor(item / 3);
                if (item % monkey.divisible === 0) {
                    monkeys[monkey.ifTrue].items.push(item);
                } else {
                    monkeys[monkey.ifFalse].items.push(item);
                }
            }
            monkey.items = [];
        }
        /*for (const monkey of monkeys) {
            console.log(monkey.items);
        }*/
    }
    monkeys = R.compose(R.reverse, R.sortBy(R.prop("inspects")))(monkeys);
    return monkeys[0].inspects * monkeys[1].inspects;
}

const task2 = (monkeys, test) => {
    const divTest = monkeys.reduce((acc, m) => acc * m.divisible, 1);
    if (test === "test") {
        console.assert(divTest === 96577)
    } else {
        console.assert(divTest === 9699690)
    }
    for (let i = 0; i < 10000; i++) {
        for (const monkey of monkeys) {
            for (let item of monkey.items) {
                monkey.inspects++;
                switch (monkey.op) {
                    case "+":
                        item += monkey.n;
                        break;
                    case "-":
                        item -= monkey.n;
                        break;
                    case "*":
                        if (monkey.n === "old") {
                            item *= item;
                        } else {
                            item *= monkey.n;
                        }
                        break;
                    case "/":
                        item /= monkey.n;
                        break;
                }
                item = item % divTest;
                if (item % monkey.divisible === 0) {
                    monkeys[monkey.ifTrue].items.push(item);
                } else {
                    monkeys[monkey.ifFalse].items.push(item);
                }
            }
            monkey.items = [];
        }
    }
    monkeys = R.sort(R.descend(R.prop("inspects")), monkeys);
    return monkeys[0].inspects * monkeys[1].inspects;
}

let testdata = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 10605);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata, "test"), 2713310158);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");