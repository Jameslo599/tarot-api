//Triple api call for card reading and prevent refresh upon submitting
const form = document.querySelector("#form");
const save = document.querySelector("#save");
const cta = document.querySelector("#cta");
const session = document.cookie.slice(11);

window.addEventListener("load", async () => {
  try {
    if (document.cookie === "" || document.cookie.slice(0, 10) !== "JAMES-AUTH")
      return cta.classList.add("signedOut");
    const username = await getUser(session);
    //Return if multiple logins
    if (!username) return cta.classList.add("signedOut");

    await loadObj(session);
  } catch (error) {
    console.log(error);
  }
});

//Handles displaying data on DOM
form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    //Iterate through three child cards and update with info from api call
    const result = await getReading();
    updateDOM(result);
    //Update DOM h2 with question
    document.querySelector("#question").innerHTML =
      document.querySelector("#theAsk").value;
    //Populate save button
    save.classList.remove("hidden");
    //Reset text input
    form.reset();
  } catch (error) {
    console.log(error);
  }
});

//Handles saving
form.addEventListener("submit", () => {
  save.addEventListener("click", makeObj);
});

//Obtain a 3 card spread reading
async function getReading() {
  try {
    const cardArr = [];
    const numArr = getRandomInt(22);
    for (let i = 0; i < 3; i++) {
      try {
        const response = await fetch(
          `https://tarotapi.up.railway.app/reading/${numArr[i]}`
        );
        const data = await response.json();
        cardArr.push(data);
      } catch (error) {
        console.log(error);
      }
    }
    return cardArr.flat();
  } catch (error) {
    console.log(error);
  }
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
    cover[i].classList.replace("bg-slate-800/80", "bg-slate-800/0");
  }

  //Save object when 'save' button is clicked
  if (cta.classList.contains("signedOut")) {
    return cta.classList.remove("hidden");
  }
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
    const cover = spread.getElementsByClassName("cover");
    const container = spread.getElementsByClassName("container");
    document.querySelector("#question").innerHTML = this.question;
    for (let i = 0; i < 3; i++) {
      imgArr[i].src = this.image[i];
      meaning[i].textContent = this.meaning[i];
      container[i].classList.replace("inactive", "activated");
      spread.children[i].classList.add("card");
      cover[i].classList.replace("bg-slate-800/80", "bg-slate-800/0");
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
  try {
    //Generate unique id number
    const arr = await getArr();
    const num = arr.length ? arr[arr.length - 1].id + 1 : 0;
    const date = await getDate();

    //Send reading to be saved to account
    await fetch(`https://tarot.cyclic.app/${session}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        new Reading(
          num,
          img,
          meaning,
          document.querySelector("#question").textContent,
          date
        )
      ),
    });
  } catch (error) {
    console.log(error);
  }
}

//Load saved reading
async function loadObj(session) {
  try {
    const response = await fetch(`https://tarot.cyclic.app/${session}/viewid`);
    const data = await response.json();
    //Revive object with methods
    const arr = await getArr();
    data.length > 0
      ? Object.assign(new Reading(), arr[data]).loadState()
      : null;
  } catch (error) {
    console.log(error);
  }
}

//Obtain account's array of readings
async function getArr() {
  try {
    const account = await getUser(session);
    return account.readings;
  } catch (error) {
    console.log(error);
  }
}

//Validate session token
async function getUser(session) {
  try {
    const req = await fetch(`https://tarot.cyclic.app/session/${session}`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
