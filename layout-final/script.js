const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const header = document.querySelector("header");

function menuIsOpen() {
  return hamburger.classList.contains("open");
}

function openMenu() {
  hamburger.classList.add("open");
  nav.classList.add("open");
  //   header.classList.remove("parallax");
}

function closeMenu() {
  hamburger.classList.remove("open");
  nav.classList.remove("open");
  header.classList.add("parallax");
}

function toggleMenu() {
  if (menuIsOpen()) closeMenu();
  else openMenu();
}

hamburger.addEventListener("click", toggleMenu);
