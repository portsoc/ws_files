var mysql = require('mysql');

var config = require('./sql_config.json');

// create a connection to the database
var sql = mysql.createConnection(config.mysql);

// handle unexpected errors by just logging them
sql.on('error', function(err) {
  console.error(err);
  sql.end();
});

module.exports.saveCar = function (reg, make, model, year, price, cb) {
  // make the insert query
  var insertQuery = sql.format('INSERT INTO Car (reg, make, model, year, price) values(?,?,?,?,?)',
    [reg, make, model, year, price]);

  // now run the query
  sql.query(insertQuery, function (err) {
    cb(err);
  });
}

module.exports.getAveragePrice = function (year, cb) {
  var query = sql.format('select avg(price) from Car where year=?', [year]);

  // now run the query
  sql.query(query, function (err, data) {
    if (!err && data && typeof (data[0]['avg(price)']) === 'number') {
      cb(null, data[0]['avg(price)']);
    } else {
      cb(err || 'no average');
    }
  });
}
