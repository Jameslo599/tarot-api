require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000;
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_URI;
const { format } = require("date-fns");

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
      res.sendFile(__dirname + "/home.html");
    });
    app.get("/card-api", (req, res) => {
      res.sendFile(__dirname + "/card-api.html");
    });
    app.get("/card-reading", (req, res) => {
      res.sendFile(__dirname + "/card-reading.html");
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
      //console.log(num);
      tarotCards
        .find({ number: `${num}` })
        .toArray()
        .then((data) => res.json(data))
        .catch((error) => res.json("Could not retrieve"));
    });

    app.get("/card-reading/date", (req, res) => {
      const date = new Date();
      res.json(
        format(
          new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          "MMMM do, y"
        )
      );
    });

    // Listen
    app.listen(process.env.PORT || PORT, () => {
      console.log(`The server is running on ${PORT}.`);
    });
  })
  .catch((error) => console.error(error));
