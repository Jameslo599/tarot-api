const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;

app.use(express.static("public"));
app.use(cors());

const tarotCards = {
  magician: {
    name: "The Magician",
    image: "https://i.ibb.co/YLSH31h/a01.jpg",
    description: "This is the Magician.",
  },
  popess: {
    name: "The Popess",
    image: "https://i.ibb.co/tQ1Mvnz/a02.jpg",
    description: "This is the Popess.",
  },
  empress: {
    name: "The Empress",
    image: "https://i.ibb.co/MZHF4GQ/a03.jpg",
    description: "This is the Empress.",
  },
  emperor: {
    name: "The Emperor",
    image: "https://i.ibb.co/NsKRzLP/a04.jpg",
    description: "This is the Popess.",
  },
  pope: {
    name: "The Pope",
    image: "https://i.ibb.co/7KYtw4t/a05.jpg",
    description: "This is the Popess.",
  },
  lover: {
    name: "The Lover",
    image: "https://i.ibb.co/M8Y2XQ1/a06.jpg",
    description: "This is the Popess.",
  },
  chariot: {
    name: "The Chariot",
    image: "https://i.ibb.co/VQGWXVB/a07.jpg",
    description: "This is the Popess.",
  },
  justice: {
    name: "Justice",
    image: "https://i.ibb.co/YZ6yyWf/a08.jpg",
    description: "This is the Popess.",
  },
  hermit: {
    name: "The Hermit",
    image: "https://i.ibb.co/nr6jygN/a09.jpg",
    description: "This is the Popess.",
  },
  "wheel-of-fortune": {
    name: "The Wheel of Fortune",
    image: "https://i.ibb.co/c8NxBjY/a10.jpg",
    description: "This is the Popess.",
  },
  force: {
    name: "The Force",
    image: "https://i.ibb.co/fd15wJj/a11.jpg",
    description: "This is the Popess.",
  },
  "hanged-man": {
    name: "The Hanged Man",
    image: "https://i.ibb.co/JkGvfYz/a12.jpg",
    description: "This is the Popess.",
  },
  death: {
    name: "Untitled Card 13",
    image: "https://i.ibb.co/hXmHZsm/a13.jpg",
    description: "This is the Popess.",
  },
  temperance: {
    name: "Temperance",
    image: "https://i.ibb.co/XCjCKSm/a14.jpg",
    description: "This is the Popess.",
  },
  devil: {
    name: "The Devil",
    image: "https://i.ibb.co/J2CpCYV/a15.jpg",
    description: "This is the Popess.",
  },
  tower: {
    name: "The Tower",
    image: "https://i.ibb.co/2tMDtdR/a16.jpg",
    description: "This is the Popess.",
  },
  star: {
    name: "The Star",
    image: "https://i.ibb.co/545BnTk/a17.jpg",
    description: "This is the Popess.",
  },
  moon: {
    name: "The Moon",
    image: "https://i.ibb.co/9VMdK38/a18.jpg",
    description: "This is the Popess.",
  },
  sun: {
    name: "The Sun",
    image: "https://i.ibb.co/4MshM0P/a19.jpg",
    description: "This is the Popess.",
  },
  judgment: {
    name: "Judgment",
    image: "https://i.ibb.co/8zgW7qp/a20.jpg",
    description: "This is the Popess.",
  },
  world: {
    name: "The World",
    image: "https://i.ibb.co/Bfgpnzm/a21.jpg",
    description: "This is the Popess.",
  },
  fool: {
    name: "The Fool",
    image: "https://i.ibb.co/68B4vhL/a22.jpg",
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
