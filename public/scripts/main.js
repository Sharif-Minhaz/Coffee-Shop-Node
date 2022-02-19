window.onload = () => {
	const verticalMenu = document.querySelector(".vertical-menu");
	const revealList = document.querySelector(".bi-list");
	const closeMenu = document.querySelector(".bi-x-circle-fill");
	closeMenu.addEventListener("click", function () {
		verticalMenu.classList.remove("reveal-sidebar");
	});
	revealList.addEventListener("click", function () {
		verticalMenu.classList.add("reveal-sidebar");
	});
};

window.onscroll = () => {
	sticky();
};

function sticky() {
	let nav = document.querySelector("nav");
	if (document.documentElement.scrollTop > 150) {
		nav.classList.add("sticky");
	} else {
		nav.classList.remove("sticky");
	}
}
