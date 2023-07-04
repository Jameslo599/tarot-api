const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;

app.use(express.static("public"));
app.use(cors());

const tarotCards = {
  magician: {
    name: "The Magician",
    image: "/images/a01.jpg",
    description: "This is the Magician.",
  },
  popess: {
    name: "The Popess",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  empress: {
    name: "The Empress",
    image: "/images/a02.jpg",
    description: "This is the Empress.",
  },
  emperor: {
    name: "The Emperor",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  pope: {
    name: "The Pope",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  lover: {
    name: "The Lover",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  chariot: {
    name: "The Chariot",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  justice: {
    name: "Justice",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  hermit: {
    name: "The Hermit",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  "wheel-of-fortune": {
    name: "The Wheel of Fortune",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  force: {
    name: "The Force",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  "hanged-man": {
    name: "The Hanged Man",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  death: {
    name: "Untitled Card 13",
    image: "https://i.ibb.co/hXmHZsm/a13.jpg",
    description: "This is the Popess.",
  },
  temperance: {
    name: "Temperance",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  devil: {
    name: "The Devil",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  tower: {
    name: "The Tower",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  star: {
    name: "The Star",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  moon: {
    name: "The Moon",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  sun: {
    name: "The Sun",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  judgment: {
    name: "Judgment",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  world: {
    name: "The World",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
  fool: {
    name: "The Fool",
    image: "/images/a02.jpg",
    description: "This is the Popess.",
  },
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/:tarotCard", (req, res) => {
  const card = req.params.tarotCard.toLowerCase();
  tarotCards[card] ? res.json(tarotCards[card]) : res.json("Not found");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on ${PORT}.`);
});
