console.log("AOC 2022 - Day 18: Boiling Boulders");

Array.prototype.count = function(element) {
    return this.filter(e => e === element).length;
}

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data;

const task1 = scan => {
    console.log(scan.length);
    let surface = 0;
    for (const cube of scan) {
        let cubeArr = cube.split(",");
        for (let i = -1; i < 3; i += 2) {
            for (let j = 0; j < 3; j++) {
                cubeArr[j] = +cubeArr[j] + i;
                if (!scan.includes(cubeArr.join(","))) surface++;
                cubeArr[j] -= i;
            }
        }
    }
    return surface;
};

class Water {
    constructor(minX, maxX, minY, maxY, minZ, maxZ, scan) {
        this.minX = +minX - 1;
        this.maxX = +maxX + 1;
        this.minY = +minY - 1;
        this.maxY = +maxY + 1;
        this.minZ = +minZ - 1;
        this.maxZ = +maxZ + 1;
        this.scan = scan;
    }

    #grid = {};

    write([x, y, z], value) {
        this.#grid[z] = this.#grid[z] || {};
        this.#grid[z][y] = this.#grid[z][y] || {};
        this.#grid[z][y][x] = value;
    }

    read([x, y, z]) {
        if (z in this.#grid && y in this.#grid[z] && x in this.#grid[z][y]) {
            return this.#grid[z][y][x];
        }
    }

    getExistingCellsAround(x, y, z) {
        return [
            [x, y, z + 1],
            [x, y, z - 1],
            [x, y + 1, z],
            [x, y - 1, z],
            [x + 1, y, z],
            [x - 1, y, z],
        ].filter(([x, y, z]) => z >= this.minZ && z <= this.maxZ && y >= this.minY && y <= this.maxY && x >= this.minX && x <= this.maxX);
    }

    fill() {
        for (let i = this.minX; i <= this.maxX; i++) {
            for (let j = this.minY; j <= this.maxY; j++) {
                this.write([i, j, this.minZ], "x");
                this.write([i, j, this.maxZ], "x");
            }

        }
        for (let i = this.minY; i <= this.maxY; i++) {
            for (let j = this.minZ; j <= this.maxZ; j++) {
                this.write([this.minX, i, j], "x");
                this.write([this.maxX, i, j], "x");
            }

        }
        for (let i = this.minX; i <= this.maxX; i++) {
            for (let j = this.minZ; j <= this.maxZ; j++) {
                this.write([i, this.minY, j], "x");
                this.write([i, this.maxY, j], "x");
            }

        }
    }

    spillWater() {
        let changed = true;
        while (changed) {
            changed = false; // beware for indexes
            for (let i = this.minX; i <= this.maxX; i++) {
                for (let j = this.minY; j <= this.maxY; j++) {
                    for (let k = this.minZ; k <= this.maxZ; k++) {
                        if (this.read([i, j, k]) === "x") {
                            let cells = this.getExistingCellsAround(i, j, k);
                            // console.log([i, j, j], cells);
                            for (const cell of cells) {
                                if (this.read(cell) !== "x" && !this.scan.includes([cell[0], cell[1], cell[2]].join(","))) {
                                    this.write(cell, "x");
                                    changed = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    countResult() {
        let result = 0;
        for (let i = this.minX; i <= this.maxX; i++) {
            for (let j = this.minY; j <= this.maxY; j++) {
                for (let k = this.minZ; k <= this.maxZ; k++) {
                    if (this.read([i, j, k]) === "x") {
                        let cells = this.getExistingCellsAround(i, j, k);
                        for (const cell of cells) {
                            if (this.scan.includes([cell[0], cell[1], cell[2]].join(","))) {
                                result++; 
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
}

const task2 = scan => {
    console.log(scan.length);
    let surface = 0;
    let minX = Infinity;
    let maxX = 0;
    let minY = Infinity;
    let maxY = 0;
    let minZ = Infinity;
    let maxZ = 0;
    for (const cube of scan) {
        let cubeArr = cube.split(",");
        if (cubeArr[0] < minX) minX = +cubeArr[0];
        if (cubeArr[0] > maxX) maxX = +cubeArr[0];
        if (cubeArr[1] < minY) minY = +cubeArr[1];
        if (cubeArr[1] > maxY) maxY = +cubeArr[1];
        if (cubeArr[2] < minZ) minZ = +cubeArr[2];
        if (cubeArr[2] > maxZ) maxZ = +cubeArr[2];
    }
    console.log(minX, maxX, minY, maxY, minZ, maxZ);
    let water = new Water(minX, maxX, minY, maxY, minZ, maxZ, scan);
    water.fill();
    console.log(water);
    water.spillWater();

    console.log(water);
    surface = water.countResult();
    return surface;
};

let testdata = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

let td1 = `1,1,1
2,1,1`;

testdata = prepare(splitLines(testdata));
td1 = prepare(splitLines(td1));

console.log(td1);


console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata.sort());

console.log("");

doEqualTest(task1(td1), 10);
doEqualTest(task1(testdata), 64);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 58);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");