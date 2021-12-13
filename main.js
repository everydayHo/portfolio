"use strict";

const navbar = document.getElementById("navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

// make navar  transparent when it work
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrollong when tappong on the navbar menu

const navbarMenu = document.querySelector(".navbar_menu");

navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  console.log(event.target.dataset.link);
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });
});
