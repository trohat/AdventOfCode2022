console.log("AOC 2022 - Day 16: Proboscidea Volcanium");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const scan = {};
    const re = /Valve (\w\w) has flow rate=(\d+); tunnels? leads? to valves? ([\w, ]+)$/;
    for (const line of data) {
        let [, valve, rate, valves] = re.exec(line);
        rate = Number(rate);
        scan[valve] = { rate, valves: valves.split(", ") };
    }
    return scan;
};

function divideAndSort(openString) {
    let arr = [];
    for (let i = 0; i < openString.length; i += 2) {
        arr.push(openString[i] + openString[i + 1]);
    }
    arr.sort();
    return arr.join("");
}

function isBetterState(visited, stateString, total) {
    if (!visited.has(stateString)) return true;
    const old = visited.get(stateString);
    if (total > old) return true;
    return false;
}

const allowedTotals = [0, 20, 40, 60, 93, 126, 159, 192, 246, 300, 354, 408, 462, 516, 570, 624, 700, 776, 852, 928, 1007, 1086, 1165, 1246, 1327, 1408, 1489, 1570, 1651];
const allowedOpens = ["DD", "BBDD", "BBDDJJ", "BBDDHHJJ", "BBDDEEHHJJ", "BBCCDDEEHHJJ"];

const task1 = scan => {
    let stateString = "AA----0--0";
    let visited = new Map();
    visited.set(stateString, 0);
    let states = [stateString + "--0--XX"];
    let results = [];
    while (states.length > 0) {
        const stateString = states.shift();
        let [at, open, mins, flow, total, cameFrom] = stateString.split("--");
        mins = +mins;
        flow = +flow;
        total = +total;

        mins += 1;
        total += flow;
        if (mins >= 30) {
            results.push(total);
        } else {
            valveObj = scan[at];
            for (const valveString of valveObj.valves) {
                let [at, open, mins, flow, total, cameFrom] = stateString.split("--");
                mins = +mins;
                flow = +flow;
                total = +total;

                mins += 1;
                total += flow;

                if (valveString !== cameFrom /*&& allowedTotals.includes(total) && allowedOpens.includes(open)*/) {
                    let newStateString = `${valveString}--${open}--${mins}--${flow}`;
                    if (isBetterState(visited, newStateString, total)) {
                        visited.set(newStateString, total);
                        states.push(`${newStateString}--${total}--${at}`);
                    }
                }
                let newValveObj = scan[valveString];
                if ((open.indexOf(valveString) === -1 || open.indexOf(valveString) % 2 === 1) && newValveObj.rate !== 0) {
                    mins += 1;
                    total += flow;
                    flow += newValveObj.rate;
                    open += valveString;
                    open = divideAndSort(open);
                    if (mins >= 30) {
                        results.push(total);
                    } else /*if (allowedTotals.includes(total) && allowedOpens.includes(open))*/ {
                            let newStateString = `${valveString}--${open}--${mins}--${flow}`;
                            if (isBetterState(visited, newStateString, total)) {
                                visited.set(newStateString, total);
                                states.push(`${newStateString}--${total}--aa`);
                            }
                    }
                }

            }
        }
    }
    console.log(visited.size);
    console.log(visited);
    console.log(results.length);
    console.log(results.sort());
    let best = 0;
    for (const r of results) {
        if (r > best) best = r;
    }
    return best;
};

const task2 = data => {

}

let testdata = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 1651);

console.time("Task 1");
// console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

//doEqualTest(task2(testdata), 336);
//console.time("Task 2");
//console.log("Task 2: " + task2(inputdata));
//console.timeEnd("Task 2");