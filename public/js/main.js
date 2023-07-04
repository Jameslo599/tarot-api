document.querySelector("button").addEventListener("click", getImg);

async function getImg() {
  const tarotName = document.querySelector("input").value;
  try {
    const response = await fetch(`https://tarot.cyclic.app/api/${tarotName}`);
    const data = await response.json();

    console.log(data);
    document.querySelector("h2").innerText = data.name;
  } catch (error) {
    console.log(error);
  }
}

console.log("james");
