require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000;
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_URI;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("tarot");
    const tarotCards = db.collection("tarotCards");

    // MiddleWares
    app.use(express.static("public"));
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    // Routes
    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/src/index.html");
    });

    app.get("/api/:tarotCard", (req, res) => {
      const card = req.params.tarotCard.toLowerCase();
      tarotCards
        .find({ id: `${card}` })
        .toArray()
        .then((data) => res.json(data))
        .catch((error) => res.json("Not found"));
    });

    app.get("/reading/:number", (req, res) => {
      const num = req.params.number;
      console.log(num);
      tarotCards
        .find({ number: `${num}` })
        .toArray()
        .then((data) => res.json(data))
        .catch((error) => res.json("Could not retrieve"));
    });

    // Listen
    app.listen(process.env.PORT || PORT, () => {
      console.log(`The server is running on ${PORT}.`);
    });
  })
  .catch((error) => console.error(error));
