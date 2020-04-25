const btn = document.querySelector(".menu-burger");
const menuNav = document.querySelector(".menu-nav");
const navContainer = document.querySelector(".menu-func");
const btnLines = document.querySelectorAll(".btn-line");

let showMenu = true;

btn.addEventListener("click", () => {
  if (showMenu) {
    btn.classList.add("rotate");
    menuNav.classList.add("show");
    navContainer.classList.add("show");
    btnLines.forEach((line) => line.classList.add("show"));
    showMenu = false;
  } else {
    btn.classList.remove("rotate");
    menuNav.classList.remove("show");
    navContainer.classList.remove("show");
    btnLines.forEach((line) => line.classList.remove("show"));
    showMenu = true;
  }
});
