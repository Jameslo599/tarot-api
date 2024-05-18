//API call to obtain card data prevent page refresh after submitting form
document.querySelector("#form").addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    await getName();
  } catch (error) {
    console.log(error);
  }
});

// Obtain data on a single card
async function getName() {
  try {
    const tarotName = document.querySelector("#dropDown").value;
    const response = await fetch(
      `https://tarot-api.up.railway.app/card-api/${tarotName}`,
      { credentials: "include" }
    );
    const data = await response.json();
    //Update information with results
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
