window.onload = function () {
	let baseCropping = $("#cropped-image").croppie({
		viewport: {
			width: 200,
			height: 200,
		},
		boundary: {
			width: 300,
			height: 300,
		},
		showZoomer: true,
	});

	function readableFile(file) {
		let reader = new FileReader();
		reader.onload = function (event) {
			baseCropping
				.croppie("bind", {
					url: event.target.result,
				})
				.then(() => {
					$(".cr-slider").attr({
						min: 0.5,
						max: 1.5,
					});
				});
		};
		reader.readAsDataURL(file);
	}

	$(".cancel-cropping").on("click", function () {
		$("#crop-modal").hide();
	});

	$("#profilePicsFile").on("change", function () {
		if (this.files[0]) {
			readableFile(this.files[0]);
			$("#crop-modal").show();
		}
	});

	$("#upload-image").on("click", function () {
		baseCropping
			.croppie("result", "blob")
			.then((blob) => {
				let formData = new FormData();
				let file = document.getElementById("profilePicsFile").files[0];
				let name = generateFileName(file.name);
				formData.append("profilePics", blob, name);

				let headers = new Headers();

				headers.append("accept", "application/JSON");

				let req = new Request("/uploads/profilePics", {
					method: "POST",
					headers,
					mode: "cors",
					body: formData,
				});
				return fetch(req);
			})
			.then((res) => {
				res.json();
			})
			.then((data) => {
				document.getElementById("removeProfilePicsBtn").style.display = "block";
				console.log(typeof data);
				document.getElementById("profilePics").src = data.profilePics;
				document.getElementById("profilePicsForm").reset();
			});

		$("#crop-modal").hide();
	});

	// $("#removeProfilePics").on("click", function () {
	// 	let headers = new Headers();
	// 	headers.append("Accept", "application/JSON");
	// 	let req = new Request("/uploads/profilePics", {
	// 		method: "DELETE",
	// 		headers,
	// 		mode: "cors",
	// 	});

	// 	fetch(req)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			document.getElementById("removeProfilePics").style.display = "none";
	// 			document.getElementById("profilePics").src = data.profilePics;
	// 			document.getElementById("profilePicsForm").reset();
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 			alert("Server error occurred");
	// 		});
	// });
};

function generateFileName(name) {
	const types = /(.jpg|.png|.jpeg|.gif)/;
	return name.replace(types, ".png");
}
