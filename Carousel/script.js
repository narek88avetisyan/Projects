let prev = document.querySelector("#prev");
let playPause = document.querySelector("#playPause");
let next = document.querySelector("#next");
let slides = document.querySelectorAll(".wrapper");
let timerId;
let i = 0;

showSlides();

prev.addEventListener("click", function() {
	slideShow(-1);
})

next.addEventListener("click", function () {
	slideShow(1);
})

playPause.addEventListener("click", function() {
	if (timerId) {
		clearInterval(timerId);
		timerId = null;
	} else {
		showSlides();
	}
})

function slideShow(n) {
	slides[i].style.display = "none";
	i += n;

	if (i === slides.length) {
		i = 0;
	}
	if (i < 0) {
		i = slides.length-1;
	}

	slides[i].style.display = "block";
}

function showSlides() {
	timerId = setInterval(function() {
		slideShow(1);
	}, 3000);
}
