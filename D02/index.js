console.log("AOC 2022 - Day 2: Rock Paper Scissors");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let guide = [];
    for (const line of data) {
        move = line.split(" ");
        guide.push(move)
    }
    return guide;
};

const task1 = strategy => {
    let score = 0;
    for (const move of strategy) {
        switch (move[1]) {
            case "Z":
                score++;
            case "Y":
                score++;
            case "X":
                score++; 
        }
        move[1] = chr(ord(move[1]) - 23);
        if (move[0] === move[1]) score += 3;
        if (move[0] === "C" && move["1"] === "A" || move[0] === "A" && move["1"] === "B" || move[0] === "B" && move["1"] === "C") score += 6;
    }
    return score;
};


// This is an example of code which is not great. I don't care for now but don't do the same if you DO care.
const task2 = strategy => {
    let score = 0;
    for (const move of strategy) {
        switch (move[1]) {
            case "C":
                score += 6;
                switch (move[0]) {
                    case "A":
                        score += 2;
                        break;
                    case "B":
                        score += 3;
                        break;
                    case "C":
                        score += 1;
                        break; 
                }
                break;
            case "B":
                score += 3;
                switch (move[0]) {
                    case "A":
                        score += 1;
                        break;
                    case "B":
                        score += 2;
                        break;
                    case "C":
                        score += 3;
                        break; 
                }
                break;
            case "A":
                switch (move[0]) {
                    case "A":
                        score += 3;
                        break;
                    case "B":
                        score += 1;
                        break;
                    case "C":
                        score += 2;
                        break; 
                }
                break; 
        }
    }
    return score;
};

let testdata = `A Y
B X
C Z`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 15);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 12);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");