const maxApi = require("max-api");
const fs = require("fs");
const path = require("path");

let sourceDirectory = null;

let directories = [];

maxApi.addHandler("init", async (dir) => {
    sourceDirectory = dir;

    for (let i = 0; i < 10; i++) {
        const fn = path.join(__dirname, sourceDirectory, `${i}-**********`);
        fs.writeFile(fn, "lol", (err) => {
            console.error(err);
        });
        directories[i] = fn;
    }
});

maxApi.addHandler("values", async (...values) => {
    let todos = [];
    values.forEach((v, i) => {
        let idx = Math.floor(((v / 2) + 0.5) * 10);
        if (idx >= 10) idx = 9;
        let str = "";
        for (let c = 0; c <= idx; c++) {
            str += c === idx ? "|" : "*";
        }
        const newFileName = `${i}-${str}`;
        const fn = path.join(__dirname, sourceDirectory, newFileName);
        todos.push(new Promise((resolve) => {
            fs.rename(directories[i], fn, resolve);
        }));
        directories[i] = fn;
    });

    await Promise.all(todos);
});
