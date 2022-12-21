console.log("AOC 2022 - Day 7: No Space Left On Device");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    output = data.map(line => line.split(" "));

    const root = {};
    let actual = {};
    let pathBack = [];
    const dirs = [root];
    for (const line of output) {
        if (line[0] === "$") {
            if (line[1] === "cd") {
                switch (line[2]) {
                    case "/":
                        actual = root;
                        pathBack = [];
                        break;
                    case "..":
                        actual = pathBack.pop();
                        break;
                    default:
                        pathBack.push(actual);
                        actual = actual[line[2]];
                        break;
                }
            }
            if (line[1] === "ls") {
            }
        }
        if (line[0] === "dir") {
            actual[line[1]] = {};
            dirs.push(actual[line[1]]);
        }
        if (line[0].match(/^\d+$/)) {
            actual[line[1]] = +line[0];
        }
    }

    const getSize = dir => {
        let size = 0;
        for (const val of Object.values(dir)) {
            if (_.isObject(val)) {
                size += getSize(val);
            } else {
                size += val;
            }
        }
        return size;
    }

    let totalSize = 0;
    let sizes = [];
    for (const dir of dirs) {
        let size = getSize(dir);
        sizes.push(size);
        if (size === 8543)
            console.log(dir)
        if (size <= 100000) {
            totalSize += size;
        }
    }
    console.log(JSON.stringify(root));
    return [totalSize, sizes];
};

const task1 = ([totalSize, _]) => {
    return totalSize;
};

const task2 = ([ _, sizes]) => {
    let free = 70000000 - sizes[0];
    // console.log("Free", free);
    let needed = 30000000 - free;
    // console.log("Needed", needed);

    sizes.sort((a,b) => a - b);
    bestSize = sizes.find(s => s > needed);
    // console.log("Best", bestSize);

    return bestSize;
}

let testdata = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 95437);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 24933642);
console.log("Task 2: " + task2(inputdata));