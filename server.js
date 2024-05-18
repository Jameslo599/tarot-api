require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const uri = process.env.MONGO_URI;
const mongoose = require("mongoose");
const { format } = require("date-fns");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");

mongoose.Promise = Promise;
mongoose.connect(uri, { dbName: "tarot" });
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB:", mongoose.connection.db.databaseName);
});

const tarotCardSchema = new mongoose.Schema({
  id: String,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  forgot: { type: String, required: true },
  readings: { type: Array, required: true },
  view: { type: String },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

const TarotCard = mongoose.model("TarotCard", tarotCardSchema);
const User = mongoose.model("User", userSchema);

// MiddleWares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://tarot-api.up.railway.app", // Update this to your client origin
    credentials: true,
  })
);
app.use(cookieParser());

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
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});
app.get("/history", (req, res) => {
  res.sendFile(__dirname + "/history.html");
});

//Return card info corresponding to name
app.get("/card-api/:tarotCard", (req, res) => {
  const card = req.params.tarotCard.toLowerCase();
  TarotCard.find({ id: card })
    .then((data) => res.json(data))
    .catch((error) => res.json("Not found"));
});
//Return card corresponding to number
app.get("/reading/:number", (req, res) => {
  const num = req.params.number;
  TarotCard.find({ number: num })
    .then((data) => res.json(data))
    .catch((error) => res.json("Could not retrieve"));
});
//Return today's date
app.get("/card-reading/date", (req, res) => {
  const date = new Date();
  res.json(
    format(
      new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      "MMMM do, y"
    )
  );
});

//Get all users
app.get("/users", (req, res) => {
  getUsers()
    .then((data) => res.json(data))
    .catch((error) => res.json("Error in creating user"));
});

//Get user by session token
app.get("/session/:token", (req, res) => {
  const session = `${req.params.token}`;
  getSession(session)
    .then((data) => res.json(data))
    .catch(() => res.json("Token does not exist"));
});

//Add new user
app.post("/auth/register", (req, res) => {
  const user = req.body.user.toLowerCase();
  const email = req.body.email.toLowerCase();
  const salt = random();
  const password = authenticate(salt, req.body.password);
  createUser({
    username: user,
    email: email,
    forgot: req.body.password,
    readings: [],
    authentication: {
      salt: salt,
      password: password,
    },
  })
    .then((data) => res.json(data))
    .catch((error) => res.json("Error in creating user"));
});

//Check if user exists
app.post("/check", (req, res) => {
  const user = req.body.user.toLowerCase();
  getUsername(user)
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

//Check if user exists for account creation
app.post("/check/create", async (req, res) => {
  try {
    const user = req.body.user.toLowerCase();
    const email = req.body.email.toLowerCase();
    const [userData, emailData] = await Promise.all([
      getUsername(user),
      getEmail(email),
    ]);
    res.json({ username: userData, email: emailData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Login user
app.post("/auth/login", async (req, res) => {
  try {
    let user = await getUsername(req.body.user).select(
      "+authentication.salt +authentication.password"
    );
    user = user[0];
    const expectedHash = authenticate(
      user.authentication.salt,
      req.body.password
    );
    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403).json(false);
    }
    const salt = random();
    user.authentication.sessionToken = authenticate(salt, user._id.toString());
    await user.save();

    res.cookie("JAMES-AUTH", user.authentication.sessionToken, {
      domain: "tarot-api.up.railway.app",
      maxAge: 3 * 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
      secure: true, // Set to true if serving over HTTPS
      httpOnly: true, // Restrict access to cookies from client-side JavaScript
      sameSite: "strict", // Prevent cross-site request forgery
    });
    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Sign out user
app.delete("/sign-out", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res
    .clearCookie("JAMES-AUTH", {
      path: "/",
      domain: "tarot-api.up.railway.app",
      sameSite: "strict",
      secure: true,
    })
    .status(200)
    .end();
});

//Delete User
app.get("/delete/:username/", (req, res) => {
  const user = req.params.username.toLowerCase();
  User.deleteOne({ username: `${user}` })
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

//Forgot Password
app.get("/forgot/:email/", (req, res) => {
  const email = req.params.email.toLowerCase();
  getEmail(email)
    .then((data) => res.json(data[0].forgot))
    .catch((error) => res.json(error));
});

//Add new reading
app.post("/:session/post", async (req, res) => {
  try {
    const session = req.params.session;
    const account = await getSession(session);
    account.readings.push(req.body);
    account.save();
  } catch (error) {
    res.json(error);
  }
});

//Delete selected reading
app.delete("/:session/delete/:id", async (req, res) => {
  try {
    const session = req.params.session;
    const id = +req.params.id;
    const account = await getSession(session);
    account.readings = account.readings.filter((e) => e.id !== id);
    account.save();
  } catch (error) {
    res.json(error);
  }
});

//Delete all readings
app.delete("/:session/delete-all", async (req, res) => {
  try {
    const session = req.params.session;
    const account = await getSession(session);
    account.readings = [];
    account.save();
    res.status(200).end();
  } catch (error) {
    res.json(error);
  }
});

//Prepare to view a reading
app.get("/:user/view/:id", async (req, res) => {
  try {
    const account = await User.findOne({ username: req.params.user });
    account.view = req.params.id;
    account.save();
    res.status(200).end();
  } catch (error) {
    res.json(error);
  }
});

//View saved reading
app.get("/:session/viewid", async (req, res) => {
  try {
    const session = req.params.session;
    const account = await getSession(session);
    res.json(account.view);
    account.view = "";
    account.save();
    res.status(200).end();
  } catch (error) {
    res.json(error);
  }
});

function getUsers() {
  return User.find({});
}
function getSession(sessionToken) {
  return User.findOne({ "authentication.sessionToken": sessionToken });
}
function getUsername(user) {
  return User.find({ username: user });
}
function getEmail(email) {
  return User.find({ email: email });
}
function createUser(values) {
  return new User(values).save().then((user) => user.toObject());
}
function getId(id) {
  User.findById(id);
}
function deleteById(id) {
  User.findOneAndDelete({ _id: id });
}
function updateById(id, values) {
  User.findByIdAndUpdate(id, values);
}

//Make random token
const SECRET = "JAMES-REST-API";

function random() {
  return crypto.randomBytes(128).toString("base64");
}
function authenticate(salt, password) {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
}

// Listen
app.listen(process.env.PORT || 8000, () => {
  console.log(`The server is running on ${process.env.PORT || 8000}.`);
});
