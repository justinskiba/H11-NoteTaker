var util = require("util");
var fs = require("fs");
var { v1: uuidv1 } = require("uuid");

var readfileasync = util.promisify(fs.readFile);
var writefileasync = util.promisify(fs.writeFile);

export default class Dbreader {
  read() {
    return readfileasync("db/db.json", "UTF-8");
  }
  write(notes) {
    return writefileasync("db/db.json", JSON.stringify(notes));
  }
  getnotes() {
    this.read().then(notes => {
      var parsednotes = {};
      if (notes) {
        parsednotes = JSON.parse(notes);
      }
      return parsednotes;
    });
  }
}

//write function get notes, find the note to be deleted, filter out from all of the notes, write remaining notes back to the file
