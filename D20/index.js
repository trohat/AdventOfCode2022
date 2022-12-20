console.log("AOC 2022 - Day 20: Grove Positioning System");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    data = data.map(Number).map((n, i) => ({number: n, origPos: i}));
    return data;
};

const task1 = fileToClone => {
    const file = R.clone(fileToClone);
    const length = file.length;
    for (let i = 0; i < length; i++) {
        //console.log(file.map( d => d.number).toString());
        const index = file.findIndex(d => d.origPos === i);
        const item = file.splice(index, 1)[0];
        const newIndex = (index + item.number) % (length - 1);
        file.splice(newIndex, 0, item);
    }
    //console.log(file.map( d => d.number).toString());
    zeroIndex = file.findIndex(d => d.number === 0);
    const i1 = (zeroIndex + 1000) % length;
    const i2 = (zeroIndex + 2000) % length;
    const i3 = (zeroIndex + 3000) % length;
    console.log(i1, i2, i3);
    const n1 = file[i1].number;
    const n2 = file[i2].number;
    const n3 = file[i3].number;
    console.log(n1, n2, n3);
    return n1 + n2 + n3;
};

const task2 = file => {
    const length = file.length;
    const decryptionKey = 811589153;
    file = file.map(d => ({...d, number: d.number * decryptionKey}));
    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < length; i++) {
            //console.log(file.map( d => d.number).toString());
            const index = file.findIndex(d => d.origPos === i);
            const item = file.splice(index, 1)[0];
            const newIndex = (index + item.number) % (length - 1);
            file.splice(newIndex, 0, item);
        }
        //console.log(file.map( d => d.number).toString());
    }
    zeroIndex = file.findIndex(d => d.number === 0);
    const i1 = (zeroIndex + 1000) % length;
    const i2 = (zeroIndex + 2000) % length;
    const i3 = (zeroIndex + 3000) % length;
    console.log(i1, i2, i3);
    const n1 = file[i1].number;
    const n2 = file[i2].number;
    const n3 = file[i3].number;
    console.log(n1, n2, n3);
    return n1 + n2 + n3;
};

let testdata = `1
2
-3
3
-2
0
4`;

testdata = prepare(splitLines(testdata));

console.log("Test data:");
console.log(testdata);

inputdata = prepare(splitLines(inputdata));

console.log("Input data:");
console.log(inputdata);

console.log("");

doEqualTest(task1(testdata), 3);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 1623178306);
console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");