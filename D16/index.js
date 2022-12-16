console.log("AOC 2022 - Day 16: Proboscidea Volcanium");

const splitLines = data => data.split(String.fromCharCode(10));

const parse = data => {
    let scan = {};
    const re = /Valve (\w\w) has flow rate=(\d+); tunnels? leads? to valves? ([\w, ]+)$/;
    for (const line of data) {
        let [, valve, rate, valves] = re.exec(line);
        rate = Number(rate);
        scan[valve] = { rate, valves: {} };
        for (const v of valves.split(", ")) {
            scan[valve].valves[v] = 1;
        }
    }
    return scan;
};

const transform = scan => {
    for (const valve of Object.keys(scan)) {
        if (valve !== "AA" && scan[valve].rate === 0 && Object.keys(scan[valve].valves).length === 2) {
            const v1 = Object.keys(scan[valve].valves)[0];
            const v2 = Object.keys(scan[valve].valves)[1];
            let distTo = scan[v1].valves[valve];
            let distFrom = scan[valve].valves[v2];
            delete scan[v1].valves[valve];
            delete scan[v2].valves[valve];
            scan[v2].valves[v1] = distTo + distFrom;
            scan[v1].valves[v2] = distTo + distFrom;
            delete scan[valve];
        }
    }
    return scan;
}

const findShortest = (scan, valve1, valve2) => {
    const seen = new Map();
    seen.set(valve1, 0);
    let states = Object.entries(scan[valve1].valves);
    let results = [];
    while (states.length > 0) {
        let [v1, l1] = states.shift();
        if (v1 === valve2) {
            results.push(l1);
        }
        for (const [v2, l2] of Object.entries(scan[v1].valves)) {
            if (!seen.has(v2) || seen.get(v2) > l1 + l2) {
                seen.set(v2, l1 + l2);
                states.push([v2, l1 + l2])
            }
        }
    }
    const length = Math.min(...results);
    scan[valve1].valves[valve2] = length;
    scan[valve2].valves[valve1] = length;
}

const findAllShortest = scan => {
    for (const valve1 of Object.keys(scan)) {
        for (const valve2 of Object.keys(scan)) {
            if (!(valve2 in scan[valve1].valves) && valve1 !== valve2)
                findShortest(scan, valve1, valve2);
        }
    }
    return scan;
}

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

const task1 = scan => {
    let stateString = "AA----0--0";
    let visited = new Map();
    visited.set(stateString, 0);
    let states = [stateString + "--0"];
    let best = 0;
    let bestOpen;
    while (states.length > 0) {
        const stateString = states.shift();
        let at = stateString.split("--")[0];

        const valves = Object.keys(scan);
        const atIndex = valves.indexOf(at);
        valves.splice(atIndex, 1);

        for (const valveString of valves) {
            let [at, open, mins, flow, total] = stateString.split("--");
            mins = +mins;
            flow = +flow;
            total = +total;

            const newValveObj = scan[valveString];
            const to = newValveObj.valves[at]; //back is same length
            if (mins + to + 1 >= 30) {
                total += flow * (30 - mins);
                if (total > best) {
                    bestOpen = open;
                    best = total;
                }
                continue;
            }
            if (open.indexOf(valveString) === -1 || open.indexOf(valveString) % 2 === 1) {
                mins += to + 1;
                total += flow * (to + 1);
                flow += newValveObj.rate;
                open += valveString;
                open = divideAndSort(open);
                let newStateString = `${valveString}--${open}--${mins}--${flow}`;
                if (isBetterState(visited, newStateString, total)) {
                        visited.set(newStateString, total);
                        states.push(`${newStateString}--${total}`);
                    }
            }
        }
    }
    console.log(bestOpen);
    return best;
}
    
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

const prepare = R.pipe(
    splitLines,
    parse,
    transform,
    findAllShortest
);

testdata = prepare(testdata);

console.log("Test data:");
console.log(testdata);

inputdata = prepare(inputdata);

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 1651);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

//doEqualTest(task2(testdata), 336);
//console.time("Task 2");
//console.log("Task 2: " + task2(inputdata));
//console.timeEnd("Task 2");