document.querySelector("button").addEventListener("click", getName);

// Obtain data on a single card
async function getName() {
  const tarotName = document.querySelector("input").value;
  try {
    const response = await fetch(`https://tarot.cyclic.app/api/${tarotName}`);
    // const response = await fetch(`http://localhost:8000/api/${tarotName}`);
    const data = await response.json();

    console.log(data);
    document.querySelector("h2").innerText = data[0].name;
    document.querySelector(".image").src = data[0].image;
    document.querySelector(".description").innerText = data[0].description;
  } catch (error) {
    console.log(error);
  }
}

// Obtain a 3 card spread reading
async function getReading() {
  const cardArr = [];
  for (let i = 0; i < 3; i++) {
    const num = getRandomInt(22);
    try {
      //   const response = await fetch(`https://tarot.cyclic.app/reading/${num}`);
      const response = await fetch(`http://localhost:8000/reading/${num}`);
      const data = await response.json();
      console.log(data);
      cardArr.push(data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(cardArr.flat());
}

// Randomized number
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
