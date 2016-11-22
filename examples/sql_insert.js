/*
 * insert a new random person
 */

var mysql = require('mysql');

var config = require('./sql_config.json');
var names = require('./names');

// create a connection to the database
var sql = mysql.createConnection(config.mysql);

// handle unexpected errors by just logging them
sql.on('error', function(err) {
  console.error(err);
  sql.end();
});

// generate a new random person
var person = newRandomPerson();

// make the insert query
var insertQuery = sql.format('INSERT INTO contact SET ? ;', person);

// now run the query
sql.query(insertQuery, function (err) {
  if (err) return error('failed insert', err);
  console.log('inserted ' + person.fname + ' ' + person.lname);
  sql.end();
});

// the program ends here


// helpful functions

function error(msg, error) {
  console.error(msg + ': ' + error);
  sql.end();
}

function newRandomPerson() {
  var newPerson = {};
  newPerson.fname = names.randomFirstName();
  newPerson.lname = names.randomLastName();
  newPerson.phone = '0' + Math.floor(Math.random()*8999999999+1000000000); // random 10-digit number
  return newPerson;
}
