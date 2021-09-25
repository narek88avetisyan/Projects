let input = document.querySelector("#input");
let button = document.querySelector("#button");
let myList = document.querySelector("#myList");
let listItems = document.querySelectorAll("li");

button.addEventListener("click", createElement);
input.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		createElement();
	}
})

for (let i = 0; i < listItems.length; i++) {
	let span = document.createElement("span");
	span.className = "delete";
	span.innerHTML = "x";
	listItems[i].appendChild(span);
}

let del = document.getElementsByClassName("delete");

for (let elem of del) {
	elem.addEventListener("click", deleteList);
}

myList.addEventListener("click", function(event) {
	if (event.target.tagName === "LI") {
		event.target.classList.toggle("checked");
	}
})

function createElement() {
	let li = document.createElement("li");
	let span = document.createElement("span");
	let value = input.value;

	span.className = "delete";
	span.innerHTML = "x";
	li.innerHTML = value;
	li.appendChild(span);

	if (value === "") {
		alert("Enter valid task");
	} else {
		myList.appendChild(li);
		input.value = "";
	}

	for (let elem of del) {
		elem.addEventListener("click", deleteList);
	}
}

function deleteList() {
	let div = this.parentElement;
	div.style.display = "none";
}
