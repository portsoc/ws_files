/*
 * Loads a file into memory,
 * and makes a new file using its
 * text content.
 *
 * Filenames are specified in
 * command-line arguments.
 */
if (process.argv.length<4) {
  console.log("Syntax: node copyfile <file to load> <new filename>");
  console.log("e.g. node copyfile dummy2.txt dummy3.txt");
  process.exit();
}

// try different mechanisms....

//var copier = require("./modules/sync1.js");
// var copier = require("./modules/sync2.js");
var copier = require("./modules/stream1.js");

copier.copy(process.argv[2], process.argv[3]);
