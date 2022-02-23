window.onload = () => {
	const verticalMenu = document.querySelector(".vertical-menu");
	const revealList = document.querySelector(".bi-list");
	const closeMenu = document.querySelector(".bi-x-circle-fill");
	const alertDiv = document.getElementById("alert-div");

	closeMenu.addEventListener("click", function () {
		verticalMenu.classList.remove("reveal-sidebar");
	});
	revealList.addEventListener("click", function () {
		verticalMenu.classList.add("reveal-sidebar");
	});

	const searchIcon = document.getElementById("search-icon");
	const searchBox = document.querySelector(".search-input");
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

	const profilePic = document.querySelectorAll(".profile-pic");
	const dropDownMenu = document.querySelectorAll(".dropdown-menu");
	for (let i = 0; i < profilePic.length; i++) {
		profilePic[i].addEventListener("click", function () {
			dropDownMenu[i].classList.toggle("dropdown-menu-reveal");
		});
	}

	const closeAlert = document.querySelectorAll(".close-alert");
	for (let i = 0; i < closeAlert.length; i++) {
		closeAlert[i].addEventListener("click", function () {
			alertDiv.style.display = "none";
		});
	}

	setTimeout(() => {
		alertDiv.style.display = "none";
	}, 3000);

	const singleMenu = document.querySelectorAll(".single-menu");
	const orderModal = document.querySelector(".order-modal");
	singleMenu.forEach(function (menu) {
		menu.addEventListener("click", function () {
			let prodName = document.querySelector(".inner-section span:first-child").innerHTML;
			document.getElementById("prod-img").src = "/images/menu-1.png";
			document.getElementById("placeName").innerHTML = prodName;
			orderModal.style.display = "block";
		});
	});

	const orderModalCls = document.getElementById("order-modal-close");
	orderModalCls.addEventListener("click", function () {
		orderModal.style.display = "none";
	});

	const dec = document.querySelector(".inc-dec span:first-child");
	const orderCount = document.querySelector(".inc-dec span:nth-child(2)");
	const inc = document.querySelector(".inc-dec span:nth-child(3)");

	dec.addEventListener("click", function () {
		let count = Number(orderCount.innerHTML);
		if (count > 1) {
			orderCount.innerHTML = count - 1;
		}
	});
	inc.addEventListener("click", function () {
		let count = Number(orderCount.innerHTML);
		if (count < 20) {
			orderCount.innerHTML = count + 1;
		}
	});
};

function sticky() {
	let nav = document.querySelector("nav");
	let searchBox = document.querySelector(".search-input");
	if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
		nav.classList.add("sticky");
		searchBox.classList.add("search-fading");
	} else {
		nav.classList.remove("sticky");
		searchBox.classList.remove("search-fading");
	}
}

window.onscroll = function () {
	sticky();
};
