//Highlight chapter when clicked
const table = document.querySelector("#table-contents").children;
for (let i = 0; i < table.length; i++) {
  table[i].addEventListener("click", () => {
    reset();
    console.log(table[i].textContent);
    switchChapter(table[i].textContent);
    table[i].classList.add("bg-gray-600");
    table[i].classList.add("font-bold");
    table[i].classList.replace(
      "border-neutral-200/40",
      "border-neutral-200/90"
    );
  });
}

//Reset highlighted chapter
function reset() {
  const list = document.querySelectorAll("ul#table-contents > a");
  for (const ele of list) {
    ele.classList.remove("bg-gray-600");
    ele.classList.remove("font-bold");
    ele.classList.replace("border-neutral-200/90", "border-neutral-200/40");
  }
}

//Switch chapters
function switchChapter(str) {
  const chapter = document.querySelectorAll("div.chapter");
  for (const ele of chapter) {
    ele.classList.add("hidden");
    ele.children[0].textContent.trim() === str
      ? ele.classList.remove("hidden")
      : null;
  }
}
