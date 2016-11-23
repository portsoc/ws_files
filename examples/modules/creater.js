function create(target, number, word) {
  var fs = require('fs');

  // fs.writeFileSync(target, data);

  var writeStream = fs.createWriteStream( target, {flags: 'w'} );

  console.log("writing", number);

  for (var i=0; i<number; i++) {
    console.log("writing", word);
    writeStream.write(word);
    writeStream.write(" ");
  }
  writeStream.end();

}

module.exports.create = create;
