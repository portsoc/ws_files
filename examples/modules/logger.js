var fs = require('fs');
var clfdate = require('clf-date')

var writeStream;
var d = false;

function log(ip, name) {
  if (d) {
    console.log("Connection from: ", ip, name);
  }

  writeStream.write( clfdate() );
  writeStream.write( " " );
  writeStream.write( ip );
  writeStream.write( " " );
  writeStream.write( name );
  writeStream.write( "\n" );
}

function init(logfile, debug) {
  d = !!debug;
  writeStream = fs.createWriteStream( logfile, {flags: 'a'} );
  if (d) {
    console.log("Logging to: ", logfile);
  }
  writeStream.write( "\n\n" );
  writeStream.write( clfdate() );
  writeStream.write( " Logger started.\n" );
}


module.exports.init = init;
module.exports.log = log;
