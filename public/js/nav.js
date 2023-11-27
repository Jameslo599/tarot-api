//Switch last nav link depending if user is signed in
window.addEventListener("load", async () => {
  if (document.cookie === "" || document.cookie.slice(0, 10) !== "JAMES-AUTH") {
    return (document.querySelector("#dropdownHover").style.display = "none");
  }
  const session = document.cookie.slice(11);
  const username = await getUser(session);
  if (!username.username) {
    return (document.querySelector("#dropdownHover").style.display = "none");
  }
  document.querySelector("#login").style.display = "none";
  await document.querySelector("#username").prepend(username.username);
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

//Close menu when clicking outside element
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
  if (
    !document.querySelector("#dropdownHover").classList.contains("md:invisible")
  )
    document.documentElement.addEventListener("click", navClick);
});

//Close drop-down when clicking outside
function navClick(e) {
  //get event path
  const path = e.composedPath();
  //check if path contains menu id
  if (
    path.some((e) => e.id === "dropdownHover") ||
    path.some((e) => e.id === "dropdownHoverButton")
  ) {
    //terminate if true
    return;
  }
  document.querySelector("#dropdownHover").classList.toggle("md:invisible");
  document.documentElement.removeEventListener("click", navClick);
}

//Determine last nav link to use
async function getUser(session) {
  try {
    const req = await fetch(`https://tarot.cyclic.app/session/${session}`);
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Add sign out functionality
document.querySelector("#signOut").addEventListener("click", signOut);

//Sign out user
async function signOut() {
  try {
    const req = await fetch("https://tarot.cyclic.app/sign-out", {
      method: "DELETE",
    });
    const data = await req.json();
    location.reload();
    return data;
  } catch (error) {
    console.log(error);
  }
}
