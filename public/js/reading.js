//Triple api call for card reading and prevent refresh upon submitting
const form = document.querySelector("#form");
const save = document.querySelector("#save");

//Handles displaying data on DOM
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //Iterate through three child cards and update with info from api call
  const result = await getReading();
  updateDOM(result);
  //Update DOM h2 with question
  document.querySelector("#question").innerHTML =
    document.querySelector("#theAsk").value;
  document
    .querySelector("#question")
    .classList.replace("bg-slate-900/0", "bg-slate-900/70");
  //Populate save button
  save.classList.remove("hidden");
  //Reset text input
  form.reset();
});
//Handles saving
form.addEventListener("submit", () => {
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
  const cover = spread.getElementsByClassName("cover");
  const container = spread.getElementsByClassName("container");
  for (let i = 0; i < arr.length; i++) {
    imgArr[i].src = arr[i].image;
    meaning[i].textContent = arr[i].meaning;
    container[i].classList.replace("inactive", "activated");
    spread.children[i].classList.add("card");
    cover[i].classList.replace("bg-slate-950/80", "bg-slate-950/0");
  }

  //Save object when 'save' button is clicked
  save.innerHTML = "Save";
  save.disabled = false;
}

//Blueprint for objects that will be used for storage
class Reading {
  constructor(id, image, meaning, question, date) {
    this.id = id;
    this.image = image;
    this.meaning = meaning;
    this.question = question;
    this.date = date;
  }
  //Load reading
  loadState() {
    const spread = document.querySelector("#cardImages");
    const imgArr = spread.getElementsByClassName("image");
    const meaning = spread.getElementsByClassName("result");
    const container = spread.getElementsByClassName("container");
    document.querySelector("#question").innerHTML = this.question;
    document
      .querySelector("#question")
      .classList.replace("bg-slate-900/0", "bg-slate-900/70");
    for (let i = 0; i < 3; i++) {
      imgArr[i].src = this.image[i];
      meaning[i].textContent = this.meaning[i];
      container[i].classList.replace("inactive", "activated");
      spread.children[i].classList.add("card");
    }
  }
}

//Get date
async function getDate() {
  try {
    const response = await fetch(`https://tarot.cyclic.app/card-reading/date`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
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
  //Prevent additional saves until new reading
  save.disabled = true;
  save.innerHTML = "Saved to History!";

  //Save
  saveObj(imgArr, meaningArr);
}

//Save new reading
async function saveObj(img, meaning) {
  //Generate unique id number
  const arr = getArr();
  const num = localStorage.length ? arr[0].id + 1 : 0;
  const date = await getDate();

  //Convert object to string for local storage
  const newObj = JSON.stringify(
    new Reading(
      num,
      img,
      meaning,
      document.querySelector("#question").textContent,
      date
    )
  );

  localStorage.setItem(num, newObj);
}

//Load saved reading
function loadObj(num) {
  //Revive object with methods
  const load = JSON.parse(localStorage.getItem(num));
  Object.assign(new Reading(), load).loadState();
}

//Obtain an array from all local storage items
function getArr() {
  const arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    arr.push(value);
  }
  return arr.sort((a, b) => b.id - a.id);
}
