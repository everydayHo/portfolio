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
	navbarMenu.classList.remove('open');
	scrollIntoView(link);
	selectNavItem(target);
});
// navbar toggle button for small screen
const toggleBtn = document.querySelector('.navbar_toggle-btn');

toggleBtn.addEventListener('click', () => {
	navbarMenu.classList.toggle('active');
});

//  handle click on "contact me" button on home
const contact = document.querySelector('.home_contact');

contact.addEventListener('click', (event) => {
	const scrollTo = document.querySelector('#contact');
	scrollTo.scrollIntoView('#contact');
});

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

// projects

const workBtnContainer = document.querySelector('.work_categories');
const projectContainer = document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
	const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
	if (filter == null) {
		return;
	}

	//  Remove selection from the previous item and select the new one
	const active = document.querySelector('.category_btn.selected');
	active.classList.remove('selected');
	const target =
		e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
	target.classList.add('selected');

	projectContainer.classList.add('anim-out');
	setTimeout(() => {
		projects.forEach((project) => {
			if (filter === '*' || filter === project.dataset.type) {
				project.classList.remove('invisible');
			} else project.classList.add('invisible');
		});
		projectContainer.classList.remove('anim-out');
	}, 300);
});

// 1.모든 섹션 요소들을 가지고 온다
//2.IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
//3.보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds = [
	'#home',
	'#about',
	'#skills',
	'#work',
	'#testimonials',
	'#contact',
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
	document.querySelector(`[data-link ="${id}"]`)
);
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
	selectedNavItem.classList.remove('active');
	selectedNavItem = selected;
	selectedNavItem.classList.add('active');
}
function scrollIntoView(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({ behavior: 'smooth' });
	selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
const observerOptions = {
	root: null,
	rootmargin: '0px',
	threshold: 0.3,
};
const observerCallback = (entries, observer) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting && entry.intersectionRatio > 0) {
			const index = sectionIds.indexOf(`#${entry.target.id}`);
			//스크롤링이 아래로 되어서 페이지가 올라옴
			if (entry.boundingClientRect.y < 0) {
				selectedNavIndex = index + 1;
			} else {
				selectedNavIndex = index - 1;
			}
		}
	});
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
	if (window.scrollY === 0) {
		selectedNavIndex = 0;
	} else if (
		window.scrollY + window.innerHeight ===
		document.body.clientHeight
	) {
		selectedNavIndex = navItems.length - 1;
	}

	selectNavItem(navItems[selectedNavIndex]);
});

// skill animation

const progress = document.querySelectorAll('.skill_bar');
const triggerPoint = document.querySelector('.skillset').offsetTop - 500;

let excuted = false;

window.addEventListener('scroll', () => {
	let scrollAmt = window.scrollY;

	if (scrollAmt > triggerPoint) {
		if (!excuted) {
			progress.forEach((item) => numAnimation(item));
		}
		excuted = true;
	}
});

function numAnimation(item) {
	let initialRate = 0;
	let targetRate = item.getAttribute('data-num');
	let progressBar = item.querySelector('.skill_value');
	let progressRate =
		item.previousElementSibling.querySelector('span:last-child');
	let numAinmate = setInterval(() => {
		if (initialRate == targetRate) {
			clearInterval(numAinmate);
		}
		initialRate++;
		progressBar.style.width = `${initialRate}%`;
		progressRate.innerText = initialRate - 1 + '%';
	}, 20);
}
