/*
 * print out the count of people we have in the contacts table
 */

var mysql = require('mysql');

var config = require('./sql_config.json');

// create a connection to the database
var sql = mysql.createConnection(config.mysql);

// handle unexpected errors by just logging them
sql.on('error', function(err) {
  console.error(err);
  sql.end();
});

// now query the table
sql.query('select count(*) as count from contact', function (err, data) {
  if (err) return error('failed to check the current count', err);

  console.log("now know " + data[0].count + " contacts");
  sql.end();
});

// the program ends here


// helpful function

function error(msg, error) {
  console.error(msg + ': ' + error);
}
