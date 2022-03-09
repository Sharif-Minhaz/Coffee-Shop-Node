window.onload = () => {
	// vertical menu in the small screen effect
	const verticalMenu = document.querySelector(".vertical-menu");
	const revealList = document.querySelector(".bi-list");
	const closeMenu = document.querySelector(".bi-x-circle-fill");
	const alertDiv = document.getElementById("alert-div");
	const darkWrapper = document.querySelector(".dark-wrapper");

	closeMenu.addEventListener("click", function () {
		verticalMenu.classList.remove("reveal-sidebar");
		darkWrapper.classList.remove("dark-wrapper-visible");
	});
	revealList.addEventListener("click", function () {
		verticalMenu.classList.add("reveal-sidebar");
		darkWrapper.classList.add("dark-wrapper-visible");
	});

	// search box javascript
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

	// close alert boxes with timeout and x button
	const closeAlert = document.querySelectorAll(".close-alert");
	for (let i = 0; i < closeAlert.length; i++) {
		closeAlert[i].addEventListener("click", function () {
			alertDiv.style.display = "none";
		});
	}
	setTimeout(() => {
		alertDiv.style.display = "none";
	}, 3000);

	// single menu modal
	const singleMenu = document.querySelectorAll(".single-menu");
	const orderModal = document.querySelector(".order-modal");
	const orderCount = document.querySelector(".inc-dec input");

	let singleMenuPrice;
	singleMenu.forEach(function (menu) {
		menu.addEventListener("click", function () {
			singleMenuPrice = this.lastElementChild.children[1].innerHTML;
			document.getElementById("price").value = singleMenuPrice;
			document.getElementById("prod-img").src = this.firstElementChild.src;
			document.getElementById("placeName").innerHTML =
				this.lastElementChild.firstElementChild.innerHTML;
			orderModal.style.display = "block";
			orderCount.value = 1;
		});
	});

	// order modal close by clicking x
	const orderModalCls = document.getElementById("order-modal-close");
	orderModalCls.addEventListener("click", function () {
		orderModal.style.display = "none";
	});

	// hidden modal feature
	closeModalClickOutside(".order-modal", ".modal-wrapper", ".modal-section");

	// product count activation
	const dec = document.querySelector(".inc-dec span:first-child");
	const inc = document.querySelector(".inc-dec span:nth-child(3)");

	dec.addEventListener("click", function () {
		let count = Number(orderCount.value);
		if (count > 1) {
			orderCount.value = count - 1;
			price.value = "$" + ((count - 1) * singleMenuPrice.substring(1)).toFixed(2);
		}
	});
	inc.addEventListener("click", function () {
		let count = Number(orderCount.value);
		if (count < 50) {
			orderCount.value = count + 1;
			price.value = "$" + ((count + 1) * singleMenuPrice.substring(1)).toFixed(2);
		}
	});

	// coffee machine modal
	const discoverMachine = document.getElementById("discover-machine");
	const coffeeMachineModal = document.getElementsByClassName("coffee-modal")[0];
	const coffeeMachinePrice = document.getElementById("price-machine");
	const currentPrice = Number(coffeeMachinePrice.value.substring(1));
	discoverMachine.addEventListener("click", function () {
		coffeeMachineModal.style.display = "block";
		let min = document.getElementById("min");
		let res = document.getElementById("count-res");
		let inc = document.getElementById("inc");
		inc.addEventListener("click", function () {
			let count = Number(res.value);
			if (count < 50) {
				count++;
				res.value = count;
				coffeeMachinePrice.value = "$" + (currentPrice * count).toFixed(2);
			}
		});
		min.addEventListener("click", function () {
			let count = Number(res.value);
			if (count > 1) {
				count--;
				res.value = count;
				coffeeMachinePrice.value = "$" + (currentPrice * count).toFixed(2);
			}
		});
		document.getElementById("order-modal-close-machine").addEventListener("click", function () {
			coffeeMachineModal.style.display = "none";
		});
	});

	// hide coffee machine modal by clicking outside
	closeModalClickOutside(".coffee-modal", ".coffee-modal-wrapper", ".coffee-modal-section");

	// hide sidebar when clicking outside
	darkWrapper.addEventListener(
		"click",
		function (e) {
			if (!e.target.closest(".vertical-menu")) {
				verticalMenu.classList.remove("reveal-sidebar");
				darkWrapper.classList.remove("dark-wrapper-visible");
			}
		},
		false
	);

	// reservation feature for disabling user input
	const date = document.getElementById("choose-date");
	const time = document.getElementById("choose-time");
	[date, time].forEach((element) => {
		element.addEventListener("keydown", function (e) {
			e.preventDefault();
		});
	});

	// now to future
	let today = new Date().toISOString().split("T")[0];
	document.getElementsByName("date")[0].setAttribute("min", today);
};

// sticky navigation
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

// close modal by clicking outside function
function closeModalClickOutside(modal, selector, targetSelector) {
	document.querySelector(selector).addEventListener(
		"click",
		function (e) {
			if (!e.target.closest(targetSelector)) {
				document.querySelector(modal).style.display = "none";
			}
		},
		false
	);
}

// manage sticky class with onscroll effect
window.onscroll = function () {
	sticky();
};
