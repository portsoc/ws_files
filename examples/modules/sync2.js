var fs = require('fs');

function exists(filename){
  try{
    fs.accessSync(filename, fs.F_OK);
    return true;
  }catch(e){
    return false;
  }
}

function copy(source, target) {

  if (!exists(source)) {
    console.log("The input file does not exist.  Stopping.");
    process.exit();
  }

  if (exists(target)) {
    console.log("The output file already exists.  Stopping.");
    process.exit();
  }

  var data = fs.readFileSync(source, 'utf8');
  fs.writeFileSync(target, data);

}

module.exports.copy = copy;
