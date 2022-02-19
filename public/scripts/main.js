window.onload = () => {
	const verticalMenu = document.querySelector(".vertical-menu");
	const revealList = document.querySelector(".bi-list");
	const closeMenu = document.querySelector(".bi-x-circle-fill");
	const searchIcon = document.getElementById("search-icon");
	const searchBox = document.querySelector(".search-input");
	closeMenu.addEventListener("click", function () {
		verticalMenu.classList.remove("reveal-sidebar");
	});
	revealList.addEventListener("click", function () {
		verticalMenu.classList.add("reveal-sidebar");
	});
	searchIcon.addEventListener("click", function () {
		this.style.display = "none";
		searchBox.classList.add("search-scaling");
		let closeBtn = this.nextElementSibling;
		closeBtn.classList.remove("set-invisible");
		closeBtn.addEventListener("click", function () {
			this.classList.add("set-invisible");
			searchIcon.style.display = "block";
			searchBox.classList.remove("search-scaling");
		});
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
