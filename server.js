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
    description:
      "The Magician card in Tarot represents a street magician dressed in fancy garb, resembling a wizard using mysterious powers to change events in real life. The elongated form between the legs can be seen as the gate to a magical reality, which can be used to focus our attention during a magical ceremony or guided imagination. The card can also signify a new beginning and a willingness to learn and develop, with the foot on the right touching an open white surface representing a step towards an undefined future. However, the card can also symbolize an immature and self-centered personality. Overall, the card represents the power of thought to create reality and the use of sorcery for good ends. \n \n The Magician utilizes various tools, some of which are more recognizable than others. Three tools on the table resemble symbols from the minor suits: a cup, a knife (which may represent swords), and circular objects resembling coins. Along with the wand held by the magician, we can see symbols from the four suits that represent different aspects of earthly life. This card may symbolize the tools and resources available to the querent, suggesting the possibility of acquiring new professional skills or using existing resources in creative ways. \n \n The wand and the oddly-shaped object in the magician’s right hand may represent masculine and feminine symbols, which he points towards each other. The magician attempts to unite opposites. However, upon closer inspection, we can see that the wand's line passes above the other shape rather than straight through it. This may indicate an unaccomplished task or the experience of missing a goal due to imprecision or carelessness. Additionally, one may also view this as a missed opportunity for conception, where an egg fails to fertilize with sperm. \n \n The Magician is a captivating figure, often dressed in fancy clothing, who creates illusions through calculated tricks. This card can represent someone with personal charm, charisma, and persuasive qualities, or someone involved in show business, sales, or public relations. However, the Magician can also be a deceitful charlatan or con artist. \n \n A more philosophical interpretation suggests that the Magician symbolizes the idea that our earthly reality and sense of self are illusions created by our consciousness. The card's number represents individuality, while the table and tools represent the objects and situations we perceive in this illusionary world. The Magician's feet, pointing in opposite directions under the table, suggest hesitancy and indecision, while the table itself may symbolize a blockage of sexual or creative energy. The Magician's incomplete field of vision and lack of self-awareness can indicate inner confusion or ignorance of important factors, but may also represent untapped potential and opportunities.",
  },
  popess: {
    name: "The Popess",
    image: "https://i.ibb.co/tQ1Mvnz/a02.jpg",
    description:
      "The card known as 'The High Priestess' in English is referred to as 'La Papesse' in French, which translates to 'the Popess.' The card may be connected to the legend of Pope Joan, a philosophy teacher in 9th-century Rome who disguised herself as a man to teach due to societal conventions. Her great wisdom made her popular and eventually led to her being elected as Pope. However, her secret was exposed when she gave birth during a procession, and she was stoned to death along with her baby. \n \n The Popess symbolizes wisdom, similar to goddesses of wisdom in various mythologies. The narrow title band at the top of the card and the Popess' tiara extending high may suggest a higher kind of wisdom or intuition from a sublime source. The turn towards the left, signifying the past, hints at possessing ancient or traditional knowledge. The Popess' open book indicates her ability to understand and express this knowledge in words. She is willing to share her knowledge, but one must make an effort to receive and understand it. \n \n The card can represent ancient wisdom, possibly with a feminine character, such as traditional knowledge passed down between women. It may also refer to subversive knowledge that undermines established conventions and existing power structures. The Popess can symbolize a spiritual mother or guide, offering wise advice and guidance. \n \n The Popess sets boundaries, expressed through her heavily covered chest area and completely hidden pelvis and legs. She only expresses herself in the intellectual domain, and even then, in a controlled and limited manner. The card can symbolize a closed and protective attitude, lack of sensuality, or Puritan conservatism. It can also indicate setting firm barriers for oneself or others, both morally and psychologically. \n \n The Popess hides her powers, similar to Pope Joan concealing her femininity and strengths in a male-dominated world. The card may represent a woman adopting 'masculine' attitudes to be accepted in a professional environment. It can also suggest a reluctance to accept a relationship where the woman has more abilities or a higher social status than her partner. For men, the card might signify pressure to hide traits that are considered feminine. Generally, the card can symbolize the need to conceal personal characteristics that go against societal norms. On the other hand, it might represent a modest person who doesn't boast about their qualities. \n \n The Popess card is often associated with secrecy. The Popess herself is veiled, and the screen behind her seems to guard something hidden. This card can indicate personal secrets, covert actions, or discreet matters that should be kept hidden. It might also suggest a spiritual secret that only the worthy can know. However, in a negative sense, the card could mean excessive secrecy or difficulty opening up. \n \n Interestingly, the Popess card can also refer to the reading itself. As a figure who knows secrets 'from behind the veil,'' the Popess may represent the reader. The card might also suggest that the querent is hiding something from us. If it appears as the last card in a reading, it could mean that the answer to the query is hidden and cannot be revealed at this time.",
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
