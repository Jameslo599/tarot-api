require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000;
const uri = process.env.MONGO_URI;
const mongoose = require("mongoose");
const { format } = require("date-fns");

mongoose.Promise = Promise;
mongoose.connect(uri);
//mongoose.connection.collection("tarotCards").rename("tarotcards");

const tarotCardSchema = new mongoose.Schema({
  id: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  pass: String,
});

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   authentication: {
//     password: { type: String, required: true, select: false },
//     salt: { type: String, select: false },
//     sessionToken: { type: String, select: false },
//   },
// });

const TarotCard = mongoose.model("TarotCard", tarotCardSchema);
const User = mongoose.model("User", userSchema);

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
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});
app.get("/card-api", (req, res) => {
  res.sendFile(__dirname + "/card-api.html");
});
app.get("/card-reading", (req, res) => {
  res.sendFile(__dirname + "/card-reading.html");
});

//Card Readings
app.get("/card-api/:tarotCard", (req, res) => {
  const card = req.params.tarotCard.toLowerCase();
  TarotCard.find({ id: card })
    .then((data) => res.json(data))
    .catch((error) => res.json("Not found"));
});

app.get("/reading/:number", (req, res) => {
  const num = req.params.number;
  TarotCard.find({ number: num })
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

//Check if user exists
app.get("/signup/:username/", (req, res) => {
  const user = req.params.username.toLowerCase();
  User.find({ username: `${user}` })
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});
//Add new user
app.get("/signup/:username/:password", (req, res) => {
  const user = req.params.username.toLowerCase();
  const password = req.params.password;
  const obj = { username: user, pass: password };
  User.create(obj)
    .then(() => res.send("User created successfully"))
    .catch((error) => res.json("Error in creating user"));
});
//Delete User
app.get("/delete/:username/", (req, res) => {
  const user = req.params.username.toLowerCase();
  User.deleteOne({ username: `${user}` })
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

// Listen
app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on ${PORT}.`);
});
