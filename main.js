'use strict';

const navbar = document.getElementById('navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// make navar  transparent when it work
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrollong when tappong on the navbar menu

const navbarMenu = document.querySelector('.navbar_menu');

navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});

//  handle click on "contact me" button on home
const contact = document.querySelector('.home_contact');

contact.addEventListener('click', (event) => {
  const scrollTo = document.querySelector('#contact');
  scrollTo.scrollIntoView('#contact');
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

//  make home slowly fade to transparent as the window scroll down.home_contact

const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  // console.log(`homeHeight: ${homeHeight}`);
  // 663;

  // 컨셉) opacity 값을 바로 적용. (1-스크롤px / 홈의 높이)
  // console.log(1 - window.scrollY / homeHeight);
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// show "arrow up"  button when scrolling down

const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', (event) => {
  scrollIntoView('#home');
});
