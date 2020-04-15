var Dbreader = require("../db/dbreader.js");

module.exports = function(app) {
  app.get("/api/notes", (req, res) => {
    Dbreader.getnotes()
      .then(notes => {
        res.json(notes);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  app.post("/api/notes", (req, res) => {
    Dbreader.savenotes()
      .then(notes => {
        res.json(notes);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  app.delete("/api/notes/:id", (req, res) => {
    Dbreader.deletenote(req.params.id)
      .then(() => {
        res.json({ ok: true });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
};
