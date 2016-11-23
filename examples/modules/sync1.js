function copy(source, target) {
  var fs = require('fs');
  var data = fs.readFileSync(source, 'utf8');
  fs.writeFileSync(target, data);
}

module.exports.copy = copy;
