/*
 * Loads a file into memory,
 * and writes it to the console.
 *
 * Filename is specified in command-line arguments
 */
if (process.argv.length<3) {
  console.log("Syntax: node filename2 <file to load>");
  console.log("e.g. node filename2 dummy2.txt");
  process.exit();
}

var fs = require('fs');
var filename = process.argv[2];
var data = fs.readFileSync(filename, 'utf8');
console.log(data);
