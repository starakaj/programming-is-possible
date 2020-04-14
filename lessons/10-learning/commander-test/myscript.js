const { program } = require("commander");

program
    .option("-r", "Raw pasta", false)
    .option("-p, --pasta <pasta>", "What kind of pasta you want", "spaghetti")
    .option("-s, <sauce>", "What kind of sauce you want", "tomato")
    .parse(process.argv);

console.log(program.R);
console.log(program.pasta);
console.log(program.S);
