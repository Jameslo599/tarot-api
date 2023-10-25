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
