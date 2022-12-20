console.log("AOC 2022 - Day 19: Not Enough Minerals");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const robots = [];
    for (const line of data) {
        let [ , robot, oreInOre, oreInClay, oreInObsidian, clayInObsidian, oreInGeode, obsidianInGeode ] = line.split(/\D+/).map(Number);
        robots.push({robot, oreInOre, oreInClay, oreInObsidian, clayInObsidian, oreInGeode, obsidianInGeode});
    }
    return robots;
};

const task = (blueprints, maxMins) => {

    const hasBetter = (visited, state) => {
        for (const old of visited) {
            if (old.geodeRobots === state.geodeRobots && old.obsRobots === state.obsRobots && old.clayRobots === state.clayRobots && 
                    old.oreRobots === state.oreRobots && old.producing === state.producing) {
                if (old.geodes === state.geodes && old.obsidian === state.obsidian && old.clay === state.clay && old.ore >= state.ore) return true;
                if (old.geodes === state.geodes && old.obsidian === state.obsidian && old.clay >= state.clay && old.ore === state.ore) return true;
                if (old.geodes === state.geodes && old.obsidian >= state.obsidian && old.clay === state.clay && old.ore === state.ore) return true;
                if (old.geodes >= state.geodes && old.obsidian === state.obsidian && old.clay === state.clay && old.ore === state.ore) return true;
            }
        }
        return false;
    };

    const addState = (states, visited, state) => {
        /*if (!hasBetter(visited, state)) {
            visited.add(state);*/
            states.push(state);
        //}
    };

    const addNewStates = (states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, maxOre, maxClay, maxObs, maxMins) => {
        for (let producing = 1; producing <= 4; producing++) {
            const state = {minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, producing};
            switch (producing) {
                case 1:
                    if (oreRobots < maxOre) {
                        addState(states, visited, state);
                    }
                    break;
                case 2:
                    if (clayRobots < maxClay) {
                        addState(states, visited, state);
                    }
                    break;
                case 3:
                    if (obsRobots < maxObs && clayRobots > 0) {
                        addState(states, visited, state);
                    }
                    break;
                case 4:
                    if (obsRobots > 0) {
                        addState(states, visited, state);
                    }
                    break;
                case 0:
                    addProducingState(states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, 0);
                    break;
                default:
                    throw new Exception("Nononononon!!!");
            }
            
        }
    };

    const addProducingState = (states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, producing) => {
        const state = {minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, producing};
        addState(states, visited, state);
    };

    let total = 0;
    let product = 1;
    if (maxMins === 32) {
        blueprints = blueprints.slice(0, 3);
        console.log(blueprints);
    }
    for (const robot of blueprints) {
        let ore = 0;
        let clay = 0;
        let obsidian = 0;
        let geodes = 0;
        let minutes = 0;
        let oreRobots = 1;
        let clayRobots = 0;
        let obsRobots = 0;
        let geodeRobots = 0;
        let maxOre = Math.max(robot.oreInOre, robot.oreInClay, robot.oreInObsidian, robot.oreInGeode);
        let maxClay = robot.clayInObsidian;
        let maxObs = robot.obsidianInGeode;
        let producing = 1; 
        let state1 = {minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, producing};
        producing = 2
        let state2 = {minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, producing};
        let states = [state1, state2];
        let visited = new Set();
        let quality = 0;
        let lastMinutes = 0;
        let stateN = 0;
        while (stateN < states.length) {
            let state = states[stateN];
            stateN++;
            let {minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, producing} = state;
            //console.log(minutes, ":", oreRobots, clayRobots, obsRobots, geodeRobots, "---", ore, clay, obsidian, geodes);
            minutes++;
            if (minutes > lastMinutes) {
                visited = new Set();
                lastMinutes = minutes;
                console.log("Minute " + minutes + ": " + states.length + " states");
            }
            ore += oreRobots; 
            clay += clayRobots; 
            obsidian += obsRobots;
            geodes += geodeRobots;
            if (minutes === maxMins) {
                if (geodes >= quality) {
                    // console.log(state);
                    // console.log(geodes);
                    // console.log(robot);
                    quality = geodes;
                }
                continue;
            }
            switch (producing) {
                case 1:
                    if (ore - oreRobots >= robot.oreInOre && minutes + 8 < maxMins) {
                        oreRobots++;
                        ore -= robot.oreInOre;
                        addNewStates(states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, maxOre, maxClay, maxObs, maxMins);
                    } else {
                        addProducingState(states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, producing);
                    }
                    break;
                case 2:
                    if (ore - oreRobots >= robot.oreInClay && minutes + 6 < maxMins) {
                        clayRobots++;
                        ore -= robot.oreInClay;
                        addNewStates(states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, maxOre, maxClay, maxObs, maxMins);
                    } else {
                        addProducingState(states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, producing);
                    }
                    break;
                case 3:
                    if (ore - oreRobots >= robot.oreInObsidian && clay - clayRobots >= robot.clayInObsidian && minutes + 3 < maxMins) {
                        obsRobots++;
                        ore -= robot.oreInObsidian;
                        clay -= robot.clayInObsidian;
                        addNewStates(states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, maxOre, maxClay, maxObs, maxMins);
                    } else {
                        addProducingState(states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, producing);
                    }
                    break;
                case 4:
                    if (ore - oreRobots >= robot.oreInGeode && obsidian - obsRobots >= robot.obsidianInGeode && minutes < maxMins) {
                        geodeRobots++;
                        ore -= robot.oreInGeode;
                        obsidian -= robot.obsidianInGeode;
                        addNewStates(states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, maxOre, maxClay, maxObs, maxMins);
                    } else {
                        addProducingState(states, visited, minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots, producing);
                    }
                    break;
                default:
                    throw new Exception("fuck offf!");
            }
        }
        console.log("----------------------------------", quality);
        
        total += quality * robot.robot;
        product *= quality;
    }
    if (maxMins === 24) {
        return total;
    } else {
        return product;
    }
};

const task2 = data => {
    
}

let testdata = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

console.time("Task 1 - test");
// doEqualTest(task(testdata, 24), 33);
console.timeEnd("Task 1 - test");

console.time("Task 1");
// console.log("Task 1: " + task(inputdata, 24));
console.timeEnd("Task 1");

console.log("");

// doEqualTest(task(testdata, 32), 336);
console.time("Task 2");
console.log("Task 2: " + task(inputdata, 32));
console.timeEnd("Task 2");