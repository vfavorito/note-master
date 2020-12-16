// bringing in dependencies 
let express = require("express");
let path = require("path");
let fs = require("fs");

// defining server variables
const app = express();
const PORT = process.env.PORT || 8080;

// bininging in middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// start the server listining on PORT
app.listen(PORT, function () {
    console.log("Server launched on PORT:" + PORT);
});

//HTML routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//api route shows all notes in JSON file
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", "utf-8", function (error, data) {
        res.json(JSON.parse(data));
        if (error) throw error;
    });
});
// post request that writes a JSON file with all saved notes
app.post("/api/notes", function (req, res) {
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname + "/db/db.json"), "utf-8"));
    const newNote = req.body;
    newNote.id = Date.now();
    savedNotes.push(newNote);
    fs.writeFileSync(path.join(__dirname + "/db/db.json"), JSON.stringify(savedNotes));
    res.json(newNote);
});
// delete request that rewrites the JSON file with all saved notes except the one that is to be deleted
app.delete("/api/notes/:id", function (req, res) {
    let toDelete = req.params.id;
    const savedNotes = JSON.parse(fs.readFileSync(path.join(__dirname + "/db/db.json"), "utf-8"));
    const notesToKeep = savedNotes.filter(note => note.id != toDelete);
    fs.writeFileSync(path.join(__dirname + "/db/db.json"), JSON.stringify(notesToKeep));
    res.json(notesToKeep);
});