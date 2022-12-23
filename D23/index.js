console.log("AOC 2022 - Day 23: Unstable Diffusion");

const splitLines = data => data.split(String.fromCharCode(10));

class Elf {
    static elves = [];

    constructor(x, y) {
        this.moving = false;
        this.dir = { x: 0, y: 0 };
        this.y = y;
        this.x = x;
        Elf.elves.push(this);
    };
}

class Grove {
    #grid = {};

    write(x, y, value) {
        this.#grid[y] = this.#grid[y] || {};
        this.#grid[y][x] = value;
    }

    read(x, y) {
        if (y in this.#grid && x in this.#grid[y]) {
            return this.#grid[y][x];
        }
    }

    delete(x, y) {
        //console.log(x, y);
        //console.log(this.#grid);
        delete this.#grid[y][x];
        if (Object.keys(this.#grid[y]).length === 0) delete this.#grid[y];
    }

    smallestRectangle() {
        //let newGrid = Object.entries(this.#grid).filter(([key, value]) => !Object.values(value).every(v => v === null));
        //this.#grid = Object.fromEntries(newGrid);
        const minY = Math.min(...Object.keys(this.#grid));
        const maxY = Math.max(...Object.keys(this.#grid));
        const minX = Math.min(...Object.values(this.#grid).flatMap(row => Object.keys(row)));
        const maxX = Math.max(...Object.values(this.#grid).flatMap(row => Object.keys(row)));

        return (maxY - minY + 1) * (maxX - minX + 1) - Elf.elves.length;
    }
}


const task1 = data => {
    Elf.elves = [];
    const grove = new Grove();
    data.forEach((line, lineIndex) => {
        [...line].forEach((char, charIndex) => {
            if (char === "#") {
                const elf = new Elf(charIndex, lineIndex);
                grove.write(charIndex, lineIndex, elf);
            }
        });
    });
    const directions = [{ dirs: upDirs, dir: { x: 0, y: -1 } },
    { dirs: downDirs, dir: { x: 0, y: 1 } },
    { dirs: leftDirs, dir: { x: -1, y: 0 } },
    { dirs: rightDirs, dir: { x: 1, y: 0 } }];

    for (let i = 0; i < 10; i++) {
        for (const elf of Elf.elves) {
            if (diagonalDirs.every(dir => !(grove.read(dir.x + elf.x, dir.y + elf.y) instanceof Elf))) continue;
            for (const dirObj of directions) {
                if (dirObj.dirs.every(dir => !(grove.read(elf.x + dir.x, elf.y + dir.y) instanceof Elf))) {
                    elf.moving = true;
                    elf.dir = dirObj.dir;
                    break;
                }
            }
        }
        let elvesToMove = Elf.elves.filter(elf => elf.moving);
        elvesToMove = elvesToMove.filter(elf => Elf.elves.every(otherElf => elf === otherElf
                                        || elf.x + elf.dir.x !== otherElf.x + otherElf.dir.x
                                        || elf.y + elf.dir.y !== otherElf.y + otherElf.dir.y)
        );
        elvesToMove.forEach(elf => {
            grove.delete(elf.x, elf.y);
            elf.x = elf.x + elf.dir.x;
            elf.y = elf.y + elf.dir.y;
            grove.write(elf.x, elf.y, elf);
        });
        Elf.elves.forEach(elf => {
            elf.dir = { x: 0, y: 0 };
            elf.moving = false;
        });
        directions.push(directions.shift());
    }
    return grove.smallestRectangle();
};

const task2 = data => {
    Elf.elves = [];
    const grove = new Grove();
    data.forEach((line, lineIndex) => {
        [...line].forEach((char, charIndex) => {
            if (char === "#") {
                const elf = new Elf(charIndex, lineIndex);
                grove.write(charIndex, lineIndex, elf);
            }
        });
    });
    const directions = [{ dirs: upDirs, dir: { x: 0, y: -1 } },
    { dirs: downDirs, dir: { x: 0, y: 1 } },
    { dirs: leftDirs, dir: { x: -1, y: 0 } },
    { dirs: rightDirs, dir: { x: 1, y: 0 } }];

    let changed = true;
    let step = 0;
    while (changed) {
        step++;
        changed = false;
        for (const elf of Elf.elves) {
            if (diagonalDirs.every(dir => !(grove.read(dir.x + elf.x, dir.y + elf.y) instanceof Elf))) continue;
            for (const dirObj of directions) {
                if (dirObj.dirs.every(dir => !(grove.read(elf.x + dir.x, elf.y + dir.y) instanceof Elf))) {
                    changed = true;
                    elf.moving = true;
                    elf.dir = dirObj.dir;
                    break;
                }
            }
        }
        let elvesToMove = Elf.elves.filter(elf => elf.moving);
        elvesToMove = elvesToMove.filter(elf => Elf.elves.every(otherElf => elf === otherElf
                                        || elf.x + elf.dir.x !== otherElf.x + otherElf.dir.x
                                        || elf.y + elf.dir.y !== otherElf.y + otherElf.dir.y)
        );
        elvesToMove.forEach(elf => {
            grove.delete(elf.x, elf.y);
            elf.x = elf.x + elf.dir.x;
            elf.y = elf.y + elf.dir.y;
            grove.write(elf.x, elf.y, elf);
        });
        Elf.elves.forEach(elf => {
            elf.dir = { x: 0, y: 0 };
            elf.moving = false;
        });
        directions.push(directions.shift());
    }
    return step;
};

let testdata0 = `.....
..##.
..#..
.....
..##.
.....`;

let testdata1 = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;

testdata0 = splitLines(testdata0);
testdata1 = splitLines(testdata1);

console.log("Test data:");
console.log(testdata1);

inputdata = splitLines(inputdata);

console.log("Input data:");
// console.log(inputdata);

console.log("");

doEqualTest(task1(testdata1), 110);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata1), 20);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");