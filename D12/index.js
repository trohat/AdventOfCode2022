console.log("AOC 2022 - Day 12: Hill Climbing Algorithm");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data;

const task1 = heightmap => {
    const sY = heightmap.findIndex(line => line.indexOf("S") !== -1);
    const eY = heightmap.findIndex(line => line.indexOf("E") !== -1);
    const sX = heightmap[sY].indexOf("S");
    const eX = heightmap[eY].indexOf("E");
    console.log(sX, sY, eX, eY);
    const visited = new Set();
    visited.add(sX + "," + sY);
    const toProcess = [sY + "," + sX + "," + "0"];
    while (toProcess.length > 0) {
        let [actY, actX, steps] = toProcess.shift().split(",");
        let lastHeight = heightmap[actY][actX];  
        if (heightmap[actY][actX] === "S")  
            lastHeight = "a";
        for (const dir of generalDirs) {
            let newX = +actX + dir.x;
            let newY = +actY + dir.y;
            if (newX < 0 || newY < 0 || newX >= heightmap[0].length || newY >= heightmap.length)
                continue;
            if (visited.has(newX + "," + newY))
                continue;
            const newHeight = heightmap[newY][newX];    
            if (newHeight === "E" && (lastHeight === "y" || lastHeight === "z")) return +steps + 1;
            if (newHeight === "E") 
                continue;
            if (ord(newHeight) <= ord(lastHeight) + 1) {
                visited.add(newX + "," + newY);
                toProcess.push(newY + "," + newX + "," + (+steps + 1))
            }
        }
    }
};

const task2 = heightmap => {
    const sY = heightmap.findIndex(line => line.indexOf("S") !== -1);
    const eY = heightmap.findIndex(line => line.indexOf("E") !== -1);
    const sX = heightmap[sY].indexOf("S");
    const eX = heightmap[eY].indexOf("E");
    console.log(sX, sY, eX, eY);
    const visited = new Map();
    visited.set(sX + "," + sY, 0);
    const toProcess = [sY + "," + sX + "," + "0"];
    const bests = [];
    while (toProcess.length > 0) {
        let [actY, actX, steps] = toProcess.shift().split(",");
        let lastHeight = heightmap[actY][actX];  
        if (heightmap[actY][actX] === "S")  
            lastHeight = "a";
        if (lastHeight === "a")
            steps = 0;
        let newSteps = +steps + 1;
        for (const dir of generalDirs) {
            let newX = +actX + dir.x;
            let newY = +actY + dir.y;
            if (newX < 0 || newY < 0 || newX >= heightmap[0].length || newY >= heightmap.length)
                continue;
            if (visited.has(newX + "," + newY) && visited.get(newX + "," + newY) <= newSteps)
                continue;
            const newHeight = heightmap[newY][newX];    
            if (newHeight === "E" && (lastHeight === "y" || lastHeight === "z")) {
                bests.push(newSteps);
                continue;
            }
            if (newHeight === "E") 
                continue;
            if (ord(newHeight) <= ord(lastHeight) + 1) {
                visited.set(newX + "," + newY, newSteps);
                toProcess.push(newY + "," + newX + "," + newSteps)
            }
        }
    }
    return bests.min();
};

let testdata = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 31);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 29);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");