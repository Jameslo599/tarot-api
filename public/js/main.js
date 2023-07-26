document.querySelector("button").addEventListener("click", getName);

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

console.log("james");
