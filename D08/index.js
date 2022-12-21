console.log("AOC 2022 - Day 8: Treetop Tree House");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(line => line.split(""));

const task1 = trees => {
    let allVisibles = 0;
    maxLI = trees.length - 1;
    maxTI = trees[0].length - 1;
    trees.forEach((line, lineIndex) => {
        line.forEach((tree, treeIndex) => {
            if (lineIndex === 0 || lineIndex === maxLI || treeIndex === 0 || treeIndex === maxTI) {
                allVisibles++;
                return;
            }
            let size = +tree;
            let visible = true;
            for (let i = 0; i < lineIndex; i++) {
                if (trees[i][treeIndex] >= size) {
                    visible = false;
                    break;
                }
            }
            if (visible) {
                allVisibles++;
                return;
            }
            visible = true;
            for (let i = maxLI; i > lineIndex; i--) {
                if (trees[i][treeIndex] >= size) {
                    visible = false;
                    break;
                }
            }
            if (visible) {
                allVisibles++;
                return;
            }
            visible = true;
            for (let i = 0; i < treeIndex; i++) {
                if (trees[lineIndex][i] >= size) {
                    visible = false;
                    break;
                }
            }
            if (visible) {
                allVisibles++;
                return;
            }
            visible = true;
            for (let i = maxTI; i > treeIndex; i--) {
                if (trees[lineIndex][i] >= size) {
                    visible = false;
                    break;
                }
            }
            if (visible) {
                allVisibles++;
                return;
            }
        })
    })
    return allVisibles;
};

const task2 = trees => {
    let highestScenic = 0;
    maxLI = trees.length - 1;
    maxTI = trees[0].length - 1;
    trees.forEach((line, lineIndex) => {
        line.forEach((tree, treeIndex) => {
            let up = 0;
            let down = 0; 
            let left = 0; 
            let right = 0;
            let size = +tree;
            for (let i = lineIndex + 1; i <= maxLI; i++) {
                if (trees[i][treeIndex] < size) {
                    down++;
                } else {
                    down++;
                    break;
                }
            }
            for (let i = lineIndex - 1; i >= 0; i--) {
                if (trees[i][treeIndex] < size) {
                    up++;
                } else {
                    up++;
                    break;
                }
            }
            for (let i = treeIndex + 1; i <= maxTI; i++) {
                if (trees[lineIndex][i] < size) {
                    right++;
                } else {
                    right++;
                    break;
                }
            }
            for (let i = treeIndex - 1; i >= 0; i--) {
                if (trees[lineIndex][i] < size) {
                    left++;
                } else {
                    left++;
                    break;
                }
            }
            let scenic = up * right * down * left;
            if (scenic > highestScenic) highestScenic = scenic;
        })
    })
    return highestScenic;
}

let testdata = `30373
25512
65332
33549
35390`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 21);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 8);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");