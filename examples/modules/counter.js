function reportError(err) {
  console.error(err);
  process.exit();
}



function count(source) {
  var fs = require('fs');
  fs.readFile(source, 'utf8',
    function(err, contents) {
      var counts = {};
      var word;
      var words = contents.split(/\W/);
      for (var i = 0; i < words.length; i++) {
        word = words[i].trim();
        if (word.length>0)
          counts[word] = 1 + (counts[word] || 0);
        }
        console.log( Object.keys(counts).length );
    }
  );

}

module.exports.count = count;
