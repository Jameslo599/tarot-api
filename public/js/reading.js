//Triple api call for card reading and prevent refresh upon submitting
const form = document.querySelector("#form");
const save = document.querySelector("#save");
const saveState = [];

//Handles displaying data on DOM
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //Iterate through three child cards and update with info from api call
  const result = await getReading();
  updateDOM(result);
  //Update DOM h2 with question
  document.querySelector("#question").innerHTML = `"${
    document.querySelector("#theAsk").value
  }"`;
  //Reset text input
  form.reset();
});
//Handles saving
form.addEventListener("submit", () => {
  //Populate save button
  save.classList.remove("hidden");
  //Save object when 'save' button is clicked
  save.addEventListener("click", makeObj);
});

//Obtain a 3 card spread reading
async function getReading() {
  const cardArr = [];
  const numArr = getRandomInt(22);
  for (let i = 0; i < 3; i++) {
    try {
      const response = await fetch(
        `https://tarot.cyclic.app/reading/${numArr[i]}`
      );
      const data = await response.json();
      cardArr.push(data);
    } catch (error) {
      console.log(error);
    }
  }
  return cardArr.flat();
}

//Randomized number without duplicates
function getRandomInt(max, arr = []) {
  if (arr.length === 3) return arr;
  const num = Math.floor(Math.random() * max);
  if (arr.includes(num)) return getRandomInt(max, arr);
  arr.push(num);
  return getRandomInt(max, arr);
}

//Update DOM with API results
function updateDOM(arr) {
  const spread = document.querySelector("#cardImages");
  const imgArr = spread.getElementsByClassName("image");
  const meaning = spread.getElementsByClassName("result");
  const container = spread.getElementsByClassName("container");
  for (let i = 0; i < arr.length; i++) {
    imgArr[i].src = arr[i].image;
    meaning[i].textContent = arr[i].meaning;
    container[i].classList.replace("inactive", "activated");
    spread.children[i].classList.add("card");
  }
}

//Blueprint for objects that will be used for storage
class Reading {
  constructor(id, image, meaning, question) {
    this.id = id;
    this.image = image;
    this.meaning = meaning;
    this.question = question;
  }
  //Load reading
  loadState() {
    const spread = document.querySelector("#cardImages");
    const imgArr = spread.getElementsByClassName("image");
    const meaning = spread.getElementsByClassName("result");
    const container = spread.getElementsByClassName("container");
    document.querySelector("#question").innerHTML = this.question;
    for (let i = 0; i < 3; i++) {
      imgArr[i].src = this.image[i];
      meaning[i].textContent = this.meaning[i];
      container[i].classList.replace("inactive", "activated");
      spread.children[i].classList.add("card");
    }
  }
}

//Create new reading object
function makeObj() {
  const images = document.getElementsByClassName("image");
  const meaning = document.getElementsByClassName("result");
  const imgArr = [];
  const meaningArr = [];
  for (let i = 0; i < images.length; i++) {
    imgArr.push(images[i].src);
    meaningArr.push(meaning[i].textContent);
  }
  console.log(saveState);
  //Prevent additional saves until new reading
  save.removeEventListener("click", makeObj);
  //Generate unique id number
  const question = saveState[saveState.length - 1]?.id
    ? saveState[saveState.length - 1].id + 1
    : 1;
  saveState.push(
    new Reading(
      question,
      imgArr,
      meaningArr,
      document.querySelector("#question").textContent
    )
  );
}