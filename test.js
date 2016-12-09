'use strict';
var fs = require('fs');
var mysql = require('mysql');

require('./logger').setupLogging(QUnit, test);

var dir = "./worksheet/";

var pathReverse = "reverse.js";
var pathModule = "texttools.js";
var pathSort = "sort.js";
var pathReverseCandidate = "reverse_these.txt";
var pathReverseOutput = "reverse_these_output.txt";
var pathLoadMe = "loadme.txt";



/**
 * File to array
 *
 * Create a function fileToArray that reads a specified text file
 * and returns an array containing its lines. Export this function from
 * a module texttools.js in the worksheet folder.
 *
 * The function should take one parameter which specifies the path
 * of the file to be loaded.
 *
 * NB: If the last line of the file is empty and results in an
 * empty string then this should be removed, such that the last line
 * in the array is always readable.
 */
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
   "texttools should export a fileToArray function that takes has one parameter",
   function () {
     var tools = require(dir+pathModule);
     ok(
       typeof tools.fileToArray === "function",
       "Create a function called fileToArray."
     );
     equal(
       tools.fileToArray.length,
       1,
       "The fileToArray function must accept a single parameter"
     )
   }
 );


  test(
    "Files, when loaded, should be returned as arrays.",
    function () {
      var tools = require(dir+pathModule);

      deepEqual(
        tools.fileToArray(dir+pathLoadMe),
        ["one", "two", "three", "four"],
        "The first loadme file results in a four element array."
      );

      deepEqual(
        tools.fileToArray(dir+pathReverseCandidate),
        ["1234567890", "1234567890"],
        "The first loadme file results in a four element array."
      );

    }
  );



/**
 * In this task you will create a reverse utiltiy which reverses
 * all the characters in a text file.
 *
 * Your texttools module should export a `reverse` function
 * which takes one parameter, which is the string to be reversed,
 * and returns the reversed string.
 *
 * Reuse the code from the `loadfile2.js` example to implement
 * an analogous utility called `reverse.js`. It should take two
 * command-line parameters: infile and outfile. Infile will specify
 * the file to read and reverse; outfile will specify the file
 * where you should write the reversed contents.
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
    equal(tools.reverse("1 2 3"), "3 2 1", 'numbers should work fine');
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
        start();
        try {
          var data = fs.readFileSync(dir+pathReverseOutput, 'utf8');
          equal(data,"\n0987654321\n0987654321", 'Reversed file contents are correct.');
        } catch (e) {
          ok(false, 'error reading ' + dir+pathReverseOutput + ': ' + e);
        }
      }
    );


  }
);





/**
 * Write a utility called sort.js.
 *
 * Sort should take two parameters:
 *   an input file name, and
 *   an output file name
 *
 * sort should operate on text files
 * ordering the contents alphabetically, line by line,
 * such that the file
 *
 *     jolly nice weather
 *     hello mum
 *     i am a text file
 *
 * would, upon finishing, read:
 *
 *     hello mum
 *     i am a text file
 *     jolly nice weather
 *
 * There are no unit tests for this challenge.
 * We will discuss what you've come up with next week.
 *
 * Hint - this *may* help... https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * ... or you might come up with a better way.
 *
 * Suggestion - do this one last,
 * after finishing the database tests below.
 */

test(
  "Programming Challenge",
  function () {
    try {
      fs.accessSync(dir+pathSort, fs.F_OK);
      ok(true, pathSort + " created");
    } catch (e) {
      ok(false, pathSort + " is missing - please create it (and then write it)");
    }
  }
);







/**
 * In the `worksheet` folder, make a module called `cardb.js`
 * that implements a simple database of cars, as defined below.
 *
 * The module exports two functions:
 *  1. `saveCar` with the following parameters: `reg`, `make`,
 *     `model`, `year`, `price`, and `cb`. The function stores
 *     the information (except `cb`) in a suitable database table
 *     that you create. When it's done, the function must call
 *     the callback `cb()`. In case of an error, it should call
 *     `cb('error')`, possibly replacing `'error'` with a better
 *     error message.
 *
 *  2. `getAveragePrice` with two parameters: `year` and `cb`.
 *     The function should find out the average price of all known cars
 *     from the given year. When done, it will call `cb(null, price)` where
 *     `price` is the computed average price. In case of an error (such as
 *     that we don't have any cars from the given year) it should call
 *     `cb('error')` or another error message to indicate that it failed.
 *
 * Put your database initialization SQL code in `worksheet/cardb_init.sql`.
 * Run the database initialization code in your MySQL.
 *
 * Put your database configuration in `worksheet/sql_config.json`.
 * Inside the `mysql` object in `sql_config.json` you should have
 * an extra property called `table` which contains the name
 * of the database table where you store the information about cars,
 * so that our tests can inspect that.
 *
 * PLEASE NOTE THAT OUR TESTS WILL DELETE ALL EXISTING DATA from the table
 * of car information. For your testing, feel free to have an SQL script
 * or a JS script that puts in some testing data.
 */

test(
  "Create a file `worksheet/sql_config.json`",
  function () {
    try {
      fs.accessSync('./worksheet/sql_config.json', fs.F_OK);
      ok(true, "`worksheet/sql_config.json` created");
    } catch (e) {
      ok(false, "`worksheet/sql_config.json` is missing - please create it");
    }

    var config = require('./worksheet/sql_config.json');
    ok(config.mysql.table, "`worksheet/sql_config.json` needs a property `table` within `mysql`");
});


test(
  "Create a file `worksheet/cardb_init.sql`",
  function () {
    try {
      fs.accessSync('./worksheet/cardb_init.sql', fs.F_OK);
      ok(true, "`worksheet/cardb_init.sql` created");
    } catch (e) {
      ok(false, "`worksheet/cardb_init.sql` is missing - please create it");
    }
});


test(
  "Create a file `worksheet/cardb.js`",
  function () {
    try {
      fs.accessSync('./worksheet/cardb.js', fs.F_OK);
      ok(true, "`worksheet/cardb.js` created");
    } catch (e) {
      ok(false, "`worksheet/cardb.js` is missing - please create it");
    }

    var cardb = require('./worksheet/cardb');

    ok(typeof cardb.saveCar === 'function', "cardb.js must export a function called `saveCar`");
    ok(typeof cardb.getAveragePrice === 'function', "cardb.js must export a function called `getAveragePrice`");
});


test(
  "Clear the database",
  function () {
    var config = require('./worksheet/sql_config.json');
    var sql = mysql.createConnection(config.mysql);
    expect(2);
    stop();
    sql.query(sql.format('select count(*) from ??', [config.mysql.table]), function (err, data) {
      if (err) {
        ok(false, 'Error checking that table ' + config.mysql.table + ' exists: ' + err);
      } else {
        ok('count(*)' in data[0], 'Table ' + config.mysql.table + ' exists');
      }

      sql.query(sql.format('delete from ??', [config.mysql.table]), function (err, data) {
        if (err) {
          ok(false, 'Error deleting data from table ' + config.mysql.table + ': ' + err);
        } else {
          ok(true, 'Table ' + config.mysql.table + ' cleared');
        }
        start();
      });
    });
});


test(
  "saveCar",
  function () {
    var cardb = require('./worksheet/cardb');
    var config = require('./worksheet/sql_config.json');
    var sql = mysql.createConnection(config.mysql);
    expect(9);
    stop();
    var timeout = setTimeout(function() {
      ok(false, 'Timeout - are you calling the callbacks?');
      start();
    }, 3000);
    cardb.saveCar('han 5010', 'Ford', 'Harrison', 1980, 8999.99, function (err) {
      if (checkError('saving car', err, timeout)) return;

      sql.query(sql.format('select count(*) from ??', [config.mysql.table]), function (err, data) {
        if (checkError('checking count', err, timeout)) return;

        equal(data[0]['count(*)'], 1, 'Expecting one car in the table');

        // beware sql injection with spurious " and '
        cardb.saveCar('bn18 qqq"', 'Brand', 'New', 2018, 15000, function (err) {
          if (checkError('saving car', err, timeout)) return;

          sql.query(sql.format('select count(*) from ??', [config.mysql.table]), function (err, data) {
            if (checkError('checking count', err, timeout)) return;

            equal(data[0]['count(*)'], 2, 'Expecting two cars in the table');

            cardb.saveCar('abcd efg', 'Luxurius', 'Novus\'', 2018, 47000, function (err) {
              if (checkError('saving car', err, timeout)) return;

              sql.query(sql.format('select count(*) from ??', [config.mysql.table]), function (err, data) {
                if (checkError('checking count', err, timeout)) return;

                equal(data[0]['count(*)'], 3, 'Expecting three cars in the table');
                start();
                clearTimeout(timeout);
              });
            });
          });
        });
      });
    });
});


test(
  "getAveragePrice",
  function () {
    // test average for one car
    // test average for two cars
    // test average for nonexistent year
    var cardb = require('./worksheet/cardb');
    expect(10);
    stop();
    var timeout = setTimeout(function() {
      ok(false, 'Timeout - are you calling the callbacks?');
      start();
    }, 3000);
    cardb.getAveragePrice(1980, function (err, avg) {
      if (checkError('getting average', err, timeout)) return;
      strictEqual(avg, 8999.99, 'the average price of cars from 1980 is 8999.99');

      cardb.getAveragePrice(2018, function (err, avg) {
        if (checkError('getting average', err, timeout)) return;
        strictEqual(avg, 31000, 'the average price of cars from 2018 is 31k');

        cardb.getAveragePrice(3000, function (err, avg) {
          ok(err != null, 'no cars from 3000: if the query does not return anything, treat it as an error');
          ok(avg == undefined, 'in case of error, must not return an average');

          cardb.getAveragePrice('\'30', function (err, avg) {
            ok(err != null, 'no cars from \'30 - beware sql injection');
            ok(avg == undefined, 'in case of error, must not return an average');

            cardb.getAveragePrice('"30', function (err, avg) {
              ok(err != null, 'no cars from "30 - beware sql injection');
              ok(avg == undefined, 'in case of error, must not return an average');
              start();
              clearTimeout(timeout);
            });
          });
        });
      });
    });
});



function checkError(msg, err, timeout) {
  if (err) {
    ok(false, 'Error ' + msg + ': ' + err);
    if (timeout) clearTimeout(timeout);
    start();
    return true;
  } else {
    ok(true, 'Success ' + msg);
    return false;
  }
}
