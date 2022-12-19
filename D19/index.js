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

const oreBlockingClay = (robot, ore, oreRobots) => {
    return isBlocking(robot, "oreInOre", "oreInClay", ore, oreRobots, ore, oreRobots, "oreInClay");
}

const oreBlockingObsidian = (robot, ore, oreRobots, clay, clayRobots) => {
    return isBlocking(robot, "oreInOre", "oreInObsidian", ore, oreRobots, clay, clayRobots, "clayInObsidian");
}

const oreBlockingGeode = (robot, ore, oreRobots, obsidian, obsRobots) => {
    return isBlocking(robot, "oreInOre", "oreInGeode", ore, oreRobots, obsidian, obsRobots, "obsidianInGeode");
}

const clayBlockingObsidian = (robot, ore, oreRobots, clay, clayRobots) => {
    return isBlocking(robot, "oreInClay", "oreInObsidian", ore, oreRobots, clay, clayRobots, "clayInObsidian");
}

const clayBlockingGeode = (robot, ore, oreRobots, obsidian, obsRobots) => {
    return isBlocking(robot, "oreInClay", "oreInGeode", ore, oreRobots, obsidian, obsRobots, "obsidianInGeode");
}

const obsidianBlockingGeode = (robot, ore, oreRobots, obsidian, obsRobots) => {
    return isBlocking(robot, "oreInObsidian", "oreInGeode", ore, oreRobots, obsidian, obsRobots, "obsidianInGeode");
}

// AAblockingBB
// robot, AAinORE, BBinORE, ore, oreRobots, SECONDMAT, SECONDMATrobots, BBinSECONDMAT
const isBlocking = (robot, blocking, blocked, conflictingAmount, conflictingProduction, waitingAmount, waitingProduction, waitingMaterialTarget) => {
    if (robot[blocked] <= robot[blocking]) return false;
    if (waitingProduction === 0) return false;
    if (conflictingProduction === 0) return false;
    let howMuchWaitingMaterialWeNeed = robot[waitingMaterialTarget] - waitingAmount + waitingProduction;
    let daysToWait = Math.ceil(howMuchWaitingMaterialWeNeed / waitingProduction);
    let howMuchWillIHave = conflictingAmount + (conflictingProduction - 1) * daysToWait;
    if (howMuchWillIHave >= robot[blocking] + robot[blocked]) return false;
    return true;
}

const task1 = blueprints => {
    let total = 0;
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
        let state = `${minutes}-${ore}-${clay}-${obsidian}-${geodes}-${oreRobots}-${clayRobots}-${obsRobots}-${geodeRobots}`
        let states = [state];
        let visited = new Set();
        visited.add(state);
        let quality = 0;
        while (states.length > 0) {
            let state = states.shift();
            [ minutes, ore, clay, obsidian, geodes, oreRobots, clayRobots, obsRobots, geodeRobots ] = state.split("-").map(Number);
            minutes++;
            ore += oreRobots; 
            clay += clayRobots; 
            obsidian += obsRobots;
            geodes += geodeRobots;
            if (minutes === 24) {
                if (geodes >= quality) {
                    // console.log(state);
                    // console.log(geodes);
                    // console.log(robot);
                    quality = geodes;
                }
                continue;
            }
            let producing = false;
            if (ore - oreRobots >= robot.oreInOre && oreRobots < maxOre) {
                state = `${minutes}-${ore - robot.oreInOre}-${clay}-${obsidian}-${geodes}-${oreRobots + 1}-${clayRobots}-${obsRobots}-${geodeRobots}`;
                if (!visited.has(state)) {
                    visited.add(state);
                    states.push(state);
                }
                if (!oreBlockingClay(robot, ore, oreRobots) &&
                    !oreBlockingObsidian(robot, ore, oreRobots, clay, clayRobots) && 
                    !oreBlockingGeode(robot, ore, oreRobots, obsidian, obsRobots)) {
                    producing = true;
                } else {
                    console.log
                }
            }
            if (ore - oreRobots >= robot.oreInClay && clayRobots < maxClay) {
                state = `${minutes}-${ore - robot.oreInClay}-${clay}-${obsidian}-${geodes}-${oreRobots}-${clayRobots + 1}-${obsRobots}-${geodeRobots}`;
                if (!visited.has(state)) {
                    visited.add(state);
                    states.push(state);
                }
                if (!clayBlockingObsidian(robot, ore, oreRobots, clay, clayRobots) && !(clayBlockingGeode(robot, ore, oreRobots, obsidian, obsRobots))) {
                    producing = true;
                }
            }
            if (ore - oreRobots >= robot.oreInObsidian && clay - clayRobots >= robot.clayInObsidian && obsRobots < maxObs) {
                state = `${minutes}-${ore - robot.oreInObsidian}-${clay - robot.clayInObsidian}-${obsidian}-${geodes}-${oreRobots}-${clayRobots}-${obsRobots + 1}-${geodeRobots}`;
                if (!visited.has(state)) {
                    visited.add(state);
                    states.push(state);
                }
                if (!obsidianBlockingGeode(robot, ore, oreRobots, obsidian, obsRobots)) producing = true;
            }
            if (ore - oreRobots >= robot.oreInGeode && obsidian - obsRobots >= robot.obsidianInGeode) {
                state = `${minutes}-${ore - robot.oreInGeode}-${clay}-${obsidian - robot.obsidianInGeode}-${geodes}-${oreRobots}-${clayRobots}-${obsRobots}-${geodeRobots + 1}`;
                if (!visited.has(state)) {
                    visited.add(state);
                    states.push(state);
                }
                producing = true;
            }
            if (!producing) {
                state = `${minutes}-${ore}-${clay}-${obsidian}-${geodes}-${oreRobots}-${clayRobots}-${obsRobots}-${geodeRobots}`;
                states.push(state);
            }
        }
        console.log("----------------------------------", quality);
        total += quality * robot.robot;
    }
    return total;
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
doEqualTest(task1(testdata), 33);
console.timeEnd("Task 1 - test");

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

//doEqualTest(task2(testdata), 336);
//console.time("Task 2");
//console.log("Task 2: " + task2(inputdata));
//console.timeEnd("Task 2");