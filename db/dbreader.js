var util = require("util");
var fs = require("fs");
var { v1: uuidv1 } = require("uuid");

var readfileasync = util.promisify(fs.readFile);
var writefileasync = util.promisify(fs.writeFile);

class Dbreader {
  read() {
    return readfileasync("db/db.json", "UTF-8");
  }
  write(notes) {
    return writefileasync("db/db.json", JSON.stringify(notes));
  }
  getnotes() {
    return this.read().then(notes => {
      var parsednotes = [];
      if (notes) {
        parsednotes = [].concat(JSON.parse(notes));
      }

      return parsednotes;
    });
  }
  addnote(note) {
    var newNote = {
      title: note.title,
      text: note.text,
      id: uuidv1()
    };
    return this.getnotes()
      .then(notes => {
        return [...notes, newNote];
      })
      .then(updatednotes => {
        this.write(updatednotes);
      })
      .then(() => {
        return newNote;
      });
  }
  deletenote(id) {
    return this.getnotes().then(notes => {
      var savedNotes = notes.filter(note => {
        return note.id !== id;
      });
      this.write(savedNotes);
    });
  }
}
module.exports = new Dbreader();
//write function get notes, find the note to be deleted, filter out from all of the notes, write remaining notes back to the file
// filter function javascript
