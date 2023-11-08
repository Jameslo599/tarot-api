//Populate saved readings on site load
window.addEventListener("load", populate);
//Delete all readings on click
document.querySelector("#delete-all").addEventListener("click", () => {
  if (confirm("Delete all saved readings?")) {
    localStorage.clear();
    location.reload();
  }
});

//Get entry question values and dates
function populate() {
  const arr = getArr();
  for (let i = 0; i < arr.length; i++) {
    const value = JSON.parse(localStorage.getItem(arr[i].id));
    makeSpan(value.question, value.date);
  }
}

//Generate two spans for each entry and append to log
function makeSpan(query, date) {
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
  day.classList.add("sm:mx-4");
  button.classList.add("trash");
  icon.src = "/public/images/black-bin.svg";
  button.appendChild(icon);
  container.append(day, button);
  log.appendChild(container);
}

//Obtain an array from all local storage items
function getArr() {
  const arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    arr.push(value);
  }
  return arr.sort((a, b) => b.id - a.id);
}
