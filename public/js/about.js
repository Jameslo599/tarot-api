//Highlight chapter when clicked
const table = document.querySelector("#table-contents").children;
for (let i = 0; i < table.length; i++) {
  table[i].addEventListener("click", () => {
    reset();
    switchChapter(table[i].textContent);
    table[i].classList.add("bg-lilac/30");
    table[i].classList.add("font-bold");
    table[i].classList.replace("border-violet/30", "border-violet");
  });
}

//Reset highlighted chapter
function reset() {
  const list = document.querySelectorAll("ul#table-contents > a");
  for (const ele of list) {
    ele.classList.remove("bg-lilac/30");
    ele.classList.remove("font-bold");
    ele.classList.replace("border-violet", "border-violet/30");
  }
}

//Switch chapters
function switchChapter(str) {
  const chapter = document.querySelectorAll("div.chapter");
  for (const ele of chapter) {
    ele.classList.add("hidden");
    if (ele.children[0].textContent.trim() === str) {
      ele.classList.remove("hidden");
    }
  }
}
