/*
 * insert two people in a transaction, print out count of people
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

// prepare query template
var insertQuery = 'INSERT INTO contact SET ? ;';

// generate two new people
var p1 = newRandomPerson();
var p2 = newRandomPerson();

// now add them to the database
// do it in a transaction (so if one fails, neither gets inserted)
// in the end, print out the number of persons currently in the database
sql.beginTransaction(function (err) {
  if (err) return error('failed to begin transaction', err);

  sql.query(sql.format(insertQuery, p1), function (err) {
    if (err) return error('failed first insert', err, true);

    sql.query(sql.format(insertQuery, p2), function (err) {
      if (err) return error('failed second insert', err, true);

      sql.commit(function (err) {
        if (err) return error('failed second insert', err, true);

        sql.query('select count(*) as count from contact', function (err, data) {
          if (err) return error('failed to check the current count', err);

          console.log("now know " + data[0].count + " contacts");
          sql.end();
        });
      });
    });
  });
});

// the program ends here


// helpful functions

function error(msg, error, rollback) {
  console.error(msg + ': ' + error);
  if (rollback) sql.rollback();
  sql.end();
}

function newRandomPerson() {
  var newPerson = {};
  newPerson.fname = names.randomFirstName();
  newPerson.lname = names.randomLastName();
  newPerson.phone = '0' + Math.floor(Math.random()*8999999999+1000000000); // random 10-digit number
  return newPerson;
}
