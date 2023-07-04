document.querySelector("button").addEventListener("click", getName);

async function getName() {
  const tarotName = document.querySelector("input").value;
  try {
    const response = await fetch(`https://tarot.cyclic.app/api/${tarotName}`);
    const data = await response.json();

    console.log(data);
    document.querySelector("h2").innerText = data.name;
    document.querySelector(".image").src = data.image;
  } catch (error) {
    console.log(error);
  }
}

console.log("james");
