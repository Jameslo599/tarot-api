//API call to obtain card data
document.querySelector("#search").addEventListener("click", getName);
//Prevent page refresh after submitting form
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
});

// Obtain data on a single card
async function getName(e) {
  const tarotName = document.querySelector("#dropDown").value;
  try {
    const response = await fetch(`https://tarot.cyclic.app/api/${tarotName}`);
    //const response = await fetch(`http://localhost:8000/api/${tarotName}`);
    const data = await response.json();

    console.log(data);
    document.querySelector(".name").innerText = data[0].name;
    document.querySelector(".image").src = data[0].image;
    document.querySelector(".description").innerText = data[0].description;
    //Display info if first search
    if (document.querySelector("#info").classList.contains("hidden"))
      displayInfo();
  } catch (error) {
    console.log(error);
  }
}
// Displays info section
function displayInfo() {
  document.querySelector("#info").classList.toggle("hidden");
}

// Obtain a 3 card spread reading
// async function getReading() {
//   const cardArr = [];
//   const numArr = getRandomInt(22);
//   for (let i = 0; i < 3; i++) {
//     try {
//       // const response = await fetch(`https://tarot.cyclic.app/reading/${numArr[i]}`);
//       const response = await fetch(
//         `http://localhost:8000/reading/${numArr[i]}`
//       );
//       const data = await response.json();
//       console.log(data);
//       cardArr.push(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   console.log(cardArr.flat());
// }

// Randomized number without duplicates
// function getRandomInt(max, arr = []) {
//   if (arr.length === 3) return arr;
//   const num = Math.floor(Math.random() * max);
//   if (arr.includes(num)) return getRandomInt(max, arr);
//   arr.push(num);
//   return getRandomInt(max, arr);
// }
