'use strict';
var fs = require('fs');
var http = require('http');

var dir = "./worksheet/";

var pathReverse = "reverse.js";
var pathModule = "texttools.js";
var pathReverseCandidate = "reverse_these.txt";
var pathReverseOutput = "reverse_these_output.txt";



/**
 * In this task you will create a reverse utiltiy which reverses
 * all the characters in a text file.
 *
 * Reuse the code from the `loadfile2.js` example to implement
 * a utility called `reverse.js`.
 *
 * The code that reverses the string should be placed in a module
 * called `texttools.js`.  This should export a `reverse` function
 * which takes one parameter, which is the string to be reversed,
 * and returns the reversed string.
 *
 */
test(
  "`" + pathReverse + "` should exist in `" + dir + "`",
  function () {
    try {
      fs.accessSync(dir+pathReverse, fs.F_OK);

      // so, did you notice?  This is the same code we used
      // last week - and hey, look!... - it's using `fs.accessSync`
      // to check whether the file exists :-)

      ok(true, pathReverse + " created");
    } catch (e) {
      ok(false, pathReverse + " is missing - please create it");
    }
});

test(
  "`" + pathModule + "` should exist in `" + dir + "`",
  function () {
    try {
      fs.accessSync(dir+pathModule, fs.F_OK);
      ok(true, pathModule + " created");
    } catch (e) {
      ok(false, pathModule + " is missing - please create it");
    }
});



test(
  "texttools should have a reverse function",
  function () {
    var tools = require(dir+pathModule);
    ok(
      typeof tools.reverse === "function",
      "Create a function called reverse."
    );
  }
);

test(
  "the texttools reverse function should take one parameter",
  function () {
    var tools = require(dir+pathModule);
    equal(
      tools.reverse.length,
      1,
      "reverse should take exactly one parameter."
    );
  }
);

test(
  "reversing tests",
  function () {
    var tools = require(dir+pathModule);
    equal(tools.reverse(""), "", 'A reversed empty string should be an empty string');
    equal(tools.reverse("1 2 3"), "3 2 1", 'numbers shoudl work fine');
    equal(tools.reverse("hello"), "olleh", 'hello backwards is olleh');
    equal(tools.reverse("hello world"), "dlrow olleh", 'hello world backwards is dlrow olleh');
    equal(tools.reverse("hello world"), "dlrow olleh", 'hello world backwards is dlrow olleh');
    equal(tools.reverse("1 2 3 four five six 7 8 9 0"), "0 9 8 7 xis evif ruof 3 2 1", 'mixed numbers and letters');
  }
);

// once all these tests pass you know you have all
// the functionality working, so now build a program
// that uses it.


test(
  "run as an external program",
  function () {

    var exec = require('child_process').exec;
    stop();
    exec(
      "node " + dir+pathReverse + " " + dir+pathReverseCandidate + " " + dir+pathReverseOutput,
      function(error, stdout, stderr) {
        console.log(error, stderr);

        start();
        var data = fs.readFileSync(dir+pathReverseOutput, 'utf8');
        equal(data,"\n0987654321\n0987654321", 'Reversed file contents are correct.');
      }
    );



  }
);
