const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

//middlewire
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pdjev.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
console.log(uri);
const fun = async () => {
  try {
    await client.connect();

    const noteCollection = client.db("note_db").collection("note");
    //console.log(noteCollection)

    app.get("/note", async (req, res) => {
      const cursor = noteCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/note/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await noteCollection.findOne(query);
      res.send(result);
    });

    app.put("/note/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateNote = req.body;
      const note = {
        $set: {
          noteText: updateNote.noteText,
        },
      };
      const result = await noteCollection.updateOne(filter, note, options);
      res.send(result);
    });

    app.post("/note", async (req, res) => {
      const newNote = req.body;
      console.log(newNote);
      const result = await noteCollection.insertOne(newNote);
      console.log(result);
      res.send(result);
    });

    app.delete("/note/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await noteCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
};

fun().catch(console.log);

app.get("/", (req, res) => {
  res.send(" Z, SERVER IS RUNNING");
});

app.listen(port, () => {
  console.log("Z, SERVER IS RUNNING");
});


