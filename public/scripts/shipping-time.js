let orderDate = document.getElementsByClassName("order-date");
// Set the date we're counting down to
let countDownDate = new Date("oct 6, 2024 15:37:25").getTime();

// Update the count down every 1 second
let countdownFunction = setInterval(function () {
	// Get todays date and time
	let now = new Date().getTime();

	// Find the distance between now an the count down date
	let distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	let days = Math.floor(distance / (1000 * 60 * 60 * 24));
	let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Output the result in an element with id="demo"

	for (let i = 0; i < orderDate.length; i++) {
		orderDate[i].innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	}

	// If the count down is over, write some text
	if (distance < 0) {
		clearInterval(countdownFunction);
		document.getElementById("demo").innerHTML = "EXPIRED";
	}
}, 1000);
