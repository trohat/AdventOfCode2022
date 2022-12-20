console.time("test - string");

for (let i = 0; i < 1000000; i++) {
    let [a,b,c,d,e,f] = "15--16--17--18--19--20";
    a = +a;
    b = +b;
    c = +c;
    d++;
}
console.timeEnd("test - string");

console.time("test - obj");

for (let i = 0; i < 1000000; i++) {
    const obj = {
        a: 15,
        b: 16,
        c: 17,
        d: 18,
        e: 19,
        d: 20
    }
    let {a,b,c,d,e,f} = obj;
    a = +a;
    b = +b;
    c = +c;
    d++;
}
console.timeEnd("test - obj");

console.time("test - json");

for (let i = 0; i < 1000000; i++) {
    const obj = {
        a: 15,
        b: 16,
        c: 17,
        d: 18,
        e: 19,
        d: 20
    }
    x = JSON.stringify(obj);
    let {a,b,c,d,e,f} = JSON.parse(x);
    a = +a;
    b = +b;
    c = +c;
    d++;
}
console.timeEnd("test - json");