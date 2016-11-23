#!/usr/bin/env node

// make a symlink in /usr/local/bin
// ln -s /usr/local/bin/copy copy.js
// command can then be used anywhere.

/*
 * Loads a file into memory,
 * and makes a new file using its
 * text content.
 *
 * Filenames are specified in
 * command-line arguments.
 */
if (process.argv.length<3) {
  console.log("Syntax: countunique.js <file to load>");
  process.exit();
}

// try different mechanisms....

var counter = require("./modules/counter.js");
counter.count(process.argv[2]);
