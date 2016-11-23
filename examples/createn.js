#!/usr/bin/env node

/*
 * Creates a new file with n words.
 * n is a number and is the first argument
 * the word is the second argument
 * command-line arguments.
 */
if (process.argv.length<3) {
  console.log("Syntax: createn.js <filename> <n> <word>");
  process.exit();
}

require("./modules/creater.js").create(process.argv[2], process.argv[3], process.argv[4]);
