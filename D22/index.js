console.log("AOC 2022 - Day 22: Monkey Map");

const splitLines = data => data.split(String.fromCharCode(10) + String.fromCharCode(10));

const prepare = data => {
        let map = [];
        let maxLength = 0;
        let mapData = data[0].split("\n");
        mapData.shift();
        for (const line of mapData) {
                if (line.length > maxLength) maxLength = line.length;
                map.push(line);
        }
        map.maxLength = maxLength;
        let pathData = data[1];
        let path = [];
        while (pathData.length > 0) {
                n = "";
                while (/^\d/.exec(pathData)) {
                        n += pathData.substring(0, 1);
                        pathData = pathData.substring(1);
                }
                path.push(+n);
                let dir = pathData.substring(0, 1);
                pathData = pathData.substring(1);
                if (dir.length > 0) path.push(dir);
        }
        return [map, path];
};

class Board {
        constructor(map, path) {
                this.map = map;
                this.maxLength = map.maxLength;
                this.path = R.clone(path);
                this.facing = "R";
                this.y = 0;
                this.x = this.findFirstLeft(this.y);
        }

        findFirstLeft(line) {
                for (let i = 0; i < this.map[line].length; i++) {
                        if (this.map[line].at(i) !== " ") return i
                }
        }

        findFirstRight(line) {
                return this.map[line].length - 1;
        }

        findFirstTop(column) {
                for (let i = 0; i < this.map.length; i++) {
                        if (this.map[i].at(column) !== " " && this.map[i].at(column) !== undefined) return i
                }
        }

        findFirstBottom(column) {
                for (let i = this.map.length - 1; i >= 0; i--) {
                        if (this.map[i].at(column) !== " " && this.map[i].at(column) !== undefined) return i
                }
        }

        makeStep() {
                //console.log(this.y, this.x, this.facing);
                let step = charsToDirs.get(this.facing);
                let newX = this.x + step.x;
                let newY = this.y + step.y;
                if (this.map[newY] && this.map[newY].at(newX) === ".") {
                        this.x = newX;
                        this.y = newY;
                        return;
                }
                switch (this.facing) {
                        case "U":
                                if (newY < 0 || this.map[newY] && (this.map[newY].at(newX) === " " || this.map[newY].at(newX) === undefined)) {
                                        newY = this.findFirstBottom(this.x);
                                }
                                break;
                        case "D":
                                if (newY >= this.map.length || this.map[newY] && (this.map[newY].at(newX) === " " || this.map[newY].at(newX) === undefined)) {
                                        newY = this.findFirstTop(this.x);
                                }
                                break;
                        case "L":
                                if (newX < 0 || this.map[newY].at(newX) === " ") {
                                        newX = this.findFirstRight(this.y);
                                }
                                break;
                        case "R":
                                if (newX >= this.maxLength || this.map[newY].at(newX) === " " || this.map[newY].at(newX) === undefined) {
                                        newX = this.findFirstLeft(this.y);
                                }
                                break;
                        default:
                                throw new Error("Wrong facing.");
                }
                if (this.map[newY].at(newX) === ".") {
                        this.x = newX;
                        this.y = newY;
                        return;
                }
        }

        makeTurn(dir) {
                if (dir === "R") this.facing = rightTurnsInChars.get(this.facing);
                if (dir === "L") this.facing = leftTurnsInChars.get(this.facing);
        }

        walk() {

                while (this.path.length > 0) {
                        let step = this.path.shift();
                        if (/\d+/.test(step)) {
                                for (let i = 0; i < step; i++) {
                                        this.makeStep();
                                }
                        } else {
                                this.makeTurn(step);
                        }
                }
                this.result = 1004 + this.y * 1000 + this.x * 4 + "RDLU".indexOf(this.facing);
        }
}

const task1 = ([map, path]) => {
        const board = new Board(map, path);
        board.walk();

        return board.result;
};

class Cube extends Board {
        convert(x, y, facing) {
                switch (facing) {
                        case "U":
                                switch (true) {
                                        case y === 99:
                                                console.assert(x > -1 && x < 50);
                                                return ["R", 50, x + 50];
                                        // D to C bbbb
                                        case (x > 49 && x < 100):
                                                console.assert(y === -1);
                                                return ["R", 0, x + 100];
                                        // A to F cccc
                                        case (x > 99 && x < 150):
                                                console.assert(y === -1);
                                                return ["U", x - 100, 199];
                                        // B to F dddd
                                        default:
                                                throw new Error("Bad implementation of U direction.");
                                }
                        case "D":
                                switch (y) {
                                        case 200:
                                                console.assert(x > -1 && x < 50);
                                                return ["D", x + 100, 0];
                                        // F to B dddd
                                        case 150:
                                                console.assert(x > 49 && x < 100);
                                                let arr = ["L", 49, x + 100];
                                                return arr;
                                        // E to F
                                        case 50:
                                                console.assert(x > 99 && x < 150);
                                                return ["L", 99, x - 50];
                                        // B to C
                                        default:
                                                throw new Error("Bad implementation of D direction.");
                                }
                        case "L":
                                switch (true) {
                                        case (y > 149 && y < 200):
                                                console.assert(x === -1);
                                                return ["D", y - 100, 0];
                                        // F to A cccc
                                        case (y > 99 && y < 150):
                                                console.assert(x === -1);
                                                return ["R", 50, 149 - y];
                                        // D to A aaaa
                                        case (y > 49 && y < 100):
                                                console.assert(x === 49);
                                                return ["D", y - 50, 100];
                                        // C to D bbbb
                                        case (y > -1 && y < 50):
                                                console.assert(x === 49);
                                                return ["R", 0, 149 - y];
                                        // A to D aaaa
                                        default:
                                                throw new Error("Bad implementation of L direction.");
                                }
                        case "R":
                                switch (true) {
                                        case (y > 149 && y < 200):
                                                console.assert(x === 50);
                                                return ["U", y - 100, 149];
                                        // F to E
                                        case (y > 99 && y < 150):
                                                console.assert(x === 100);
                                                return ["L", 149, 149 - y];
                                        // E to B
                                        case (y > 49 && y < 100):
                                                console.assert(x === 100);
                                                return ["U", y + 50, 49];
                                        // C to B
                                        case (y > -1 && y < 50):
                                                console.assert(x === 150);
                                                return ["L", 99, 149 - y];
                                        // B to E
                                        default:
                                                throw new Error("Bad implementation of R direction.");
                                }
                        default:
                                throw new Error("Not implemented.");
                }
        }


        makeStep() {
                let step = charsToDirs.get(this.facing);
                let newX = this.x + step.x;
                let newY = this.y + step.y;
                if (this.map[newY] && this.map[newY][newX] === ".") {
                        this.x = newX;
                        this.y = newY;
                        return;
                }
                if (this.map[newY] && this.map[newY][newX] === "#") {
                        return;
                }
                let facing;
                [facing, newX, newY] = this.convert(newX, newY, this.facing);
                if (this.map[newY] && this.map[newY][newX] === ".") {
                        this.x = newX;
                        this.y = newY;
                        this.facing = facing;
                        return;
                }
        }
}

class TestCube extends Cube {
        convert(x, y, facing) {
                switch (facing) {
                        case "R":
                                console.assert(x == 12);
                                console.assert(y > 3 && y < 8);
                                return ["D", 19 - y, 8];
                        case "D":
                                console.assert(y === 12);
                                console.assert(x > 7 && x < 12);
                                return ["U", 11 - x, 7];
                        case "U":
                                console.assert(y === 3);
                                console.assert(x > 3 && x < 8);
                                return ["R", 8, x - 4];
                        default:
                                throw new Error("Not implemented.");
                }
        }
}

const task2 = ([map, path], test) => {
        let cube;
        if (test === "test") {
                cube = new TestCube(map, path)
        } else {
                cube = new Cube(map, path);
        }
        cube.walk();

        return cube.result;
}

let testdata = `        
        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 6032);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata, "test"), 5031);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");