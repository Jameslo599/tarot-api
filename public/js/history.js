//Populate saved readings on site load
window.addEventListener("load", populate);
//Delete all readings on click
document.querySelector("#delete-all").addEventListener("click", async () => {
  try {
    if (confirm("Delete all saved readings?")) {
      await fetch(`https://tarot-api.up.railway.app/session/delete-all`, {
        method: "DELETE",
        credentials: "include",
      });
      return location.reload();
    }
  } catch (error) {
    console.error("Error deleting readings:", error);
  }
});

//Get entry question values and dates
async function populate() {
  try {
    const arr = await getUser();
    console.log(arr);
    for (let i = arr.readings.length - 1; i >= 0; i--) {
      //Revive object methods
      arr[i].removeState = async function () {
        //Delete reading
        await fetch(
          `https://tarot-api.up.railway.app/session/delete/${this.id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
      };
      makeSpan(arr[i].question, arr[i].date, arr[i]);
    }
  } catch (error) {
    console.log(error);
  }
}

//Generate two spans for each entry and append to log
function makeSpan(query, date, fn) {
  const log = document.querySelector("#log");
  const question = document.createElement("span");
  const link = document.createElement("a");
  question.classList.add("entry-l");
  link.innerHTML = query;
  link.href = "https://tarot-api.up.railway.app/card-reading";
  link.target = "_blank";
  link.title = "View reading";
  link.classList.add("entry-link");
  link.addEventListener("click", async () => {
    try {
      const user = document.querySelector("#username").innerText;
      await fetch(`https://tarot-api.up.railway.app/${user}/view/${fn.id}`, {
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
  });
  question.appendChild(link);
  log.appendChild(question);
  //Append date
  const container = document.createElement("div");
  const day = document.createElement("span");
  const button = document.createElement("button");
  const icon = document.createElement("img");
  container.classList.add("entry-r");
  day.innerHTML = date;
  day.classList.add("mx-4");
  //Remove reading
  button.classList.add("trash");
  button.title = "Delete reading";
  button.addEventListener("click", () => {
    fn.removeState();
    question.style.display = "none";
    container.style.display = "none";
  });
  icon.src = "/images/black-bin.svg";
  button.appendChild(icon);
  container.append(day, button);
  log.appendChild(container);
}

//Validate session token
async function getUser() {
  try {
    const req = await fetch(`https://tarot-api.up.railway.app/session`, {
      credentials: "include",
    });
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
