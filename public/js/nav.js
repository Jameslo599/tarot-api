//Switch last nav link depending if user is signed in
window.addEventListener("load", async () => {
  if (document.cookie === "") return;
  const session = document.cookie.slice(11);
  const username = await getUser(session);
  document.querySelector("#login").style.display = "none";
  document.querySelector("#username").prepend(username.username);
  document.querySelector("#dropdownHoverButton").classList.remove("hidden");
});

//Open mobile navbar
const menu = document.querySelector("#navLinks");
const menuClass = menu.classList;
document.querySelector("#hamburger").addEventListener("click", () => {
  if (menuClass.contains("bodyClick")) {
    menuClass.remove("bodyClick");
    menuClass.toggle("scale-y-0");
    document.documentElement.removeEventListener("click", bodyClick);
    return;
  }
  menuClass.add("bodyClick");
  menuClass.toggle("scale-y-0");
  document.documentElement.addEventListener("click", bodyClick);
});

//Close menu on body click
function bodyClick(e) {
  //get event path
  const path = e.composedPath();
  //check if path contains menu id
  if (
    path.some((e) => e.id === "navLinks") ||
    path.some((e) => e.id === "navBar")
  ) {
    //terminate if true
    return;
  }
  menuClass.remove("bodyClick");
  menuClass.toggle("scale-y-0");
  document.documentElement.removeEventListener("click", bodyClick);
  document.querySelector("#burgerAni").classList.remove("nc-int-icon-state-b");
}

//Open drop-down on hover
document.querySelector("#dropdownHoverButton").addEventListener("click", () => {
  document.querySelector("#dropdownHover").classList.toggle("md:invisible");
});

//Determine last nav link
async function getUser(session) {
  try {
    const req = await fetch(`http://localhost:8000/session/${session}`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
