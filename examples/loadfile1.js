/*
 * Loads a file called dummy.txt into memory,
 * and writes it to the console.
 */
var fs = require('fs');
var data = fs.readFileSync("dummy1.txt", 'utf8');
console.log(data);
