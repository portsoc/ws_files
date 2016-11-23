function reportError(err) {
  console.error(err);
  process.exit();
}

function copy(source, target) {
  var fs = require('fs');
  var readStream = fs.createReadStream( source );
  var writeStream = fs.createWriteStream( target, {flags: 'wx'} );

  readStream.on( "error", reportError );
  writeStream.on( "error", reportError );

  readStream.pipe(writeStream);

}

module.exports.copy = copy;
