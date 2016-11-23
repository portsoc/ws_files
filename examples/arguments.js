/*
 * Lists the command line arguments passed to a program.
 */

var report = function(arg) {
  console.log(arg);
};

// print process.argv
process.argv.forEach(report);
