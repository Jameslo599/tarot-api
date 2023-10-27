//Triple api call for card reading and prevent refresh upon submitting
const form = document.querySelector("#form");
const imgArr = document
  .querySelector("#cardImages")
  .getElementsByClassName("image");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //Iterate through three child cards and update with info from api call
  const result = await getReading();
  for (let i = 0; i < result.length; i++) {
    imgArr[i].src = result[i].image;
  }
  //Update DOM h2 with question
  document.querySelector("#question").innerHTML = `"${
    document.querySelector("#theAsk").value
  }"`;
  //Reset text input
  form.reset();
});

// Obtain a 3 card spread reading
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

// Randomized number without duplicates
function getRandomInt(max, arr = []) {
  if (arr.length === 3) return arr;
  const num = Math.floor(Math.random() * max);
  if (arr.includes(num)) return getRandomInt(max, arr);
  arr.push(num);
  return getRandomInt(max, arr);
}
