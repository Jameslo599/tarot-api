//Populate saved readings on site load
window.addEventListener("load", populate);

//Get entry question values and dates
function populate() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    makeSpan(value.question, value.date);
  }
}

//Generate two spans for each entry and append to log
function makeSpan(query, date) {
  const log = document.querySelector("#log");
  const question = document.createElement("span");
  const day = document.createElement("span");
  question.classList.add("entry-l");
  question.innerHTML = query;
  log.appendChild(question);
  //Append date
  day.classList.add("entry-r");
  day.innerHTML = date;
  log.appendChild(day);
}
