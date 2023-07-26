const express = require("express");
const app = express();
const bodyParser = require("body-parser");
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

    // MiddleWars
    app.use(express.static("public"));
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    // Routes
    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    app.get("/api/:tarotCard", (req, res) => {
      const card = req.params.tarotCard.toLowerCase();
      tarotCards
        .find({ id: `${card}` })
        .toArray()
        .then((data) => res.json(data))
        .catch((error) => res.json("Not found"));
      //   tarotCards[card] ? res.json(tarotCards[card]) : res.json("Not found");
    });
  })
  .catch((error) => console.error(error));

// Listen
app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on ${PORT}.`);
});
