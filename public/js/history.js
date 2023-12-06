const session = document.cookie.slice(11);
//Populate saved readings on site load
window.addEventListener("load", populate);
//Delete all readings on click
document.querySelector("#delete-all").addEventListener("click", async () => {
  if (confirm("Delete all saved readings?")) {
    try {
      await fetch(`https://tarot.cyclic.app/${session}/delete-all`, {
        method: "DELETE",
      });
      return location.reload();
    } catch (error) {
      console.error("Error deleting readings:", error);
    }
  }
});

//Get entry question values and dates
async function populate() {
  try {
    const arr = await getArr();
    for (let i = arr.length - 1; i >= 0; i--) {
      //Revive object methods
      arr[i].removeState = async function () {
        //Delete reading
        await fetch(`https://tarot.cyclic.app/${session}/delete/${this.id}`, {
          method: "DELETE",
        });
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
  question.classList.add("entry-l");
  question.innerHTML = query;
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
