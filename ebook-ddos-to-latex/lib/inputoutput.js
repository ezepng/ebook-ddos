const fs = require("fs");

function readFromFile(filename){
  return fs.readFileSync(filename, 'utf-8');
};

function writeToFile(filename, content){
  fs.writeFile(filename, content, { encoding: 'utf-8', flag: 'w+' }, err => {
    if (err) {
      console.error(err);
    }
  })
};

module.exports = {readFromFile, writeToFile};
