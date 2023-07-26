const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://tarotapi59:koolster999@tarot.ay1wplb.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("tarot");
    const tarotCards = db.collection("tarotCards");
  })
  .catch((error) => console.error(error));

app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/:tarotCard", (req, res) => {
  const card = req.params.tarotCard.toLowerCase();

  //   tarotCards[card] ? res.json(tarotCards[card]) : res.json("Not found");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on ${PORT}.`);
});
