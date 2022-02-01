//state variables
let numDrag = 0;
let seconds = 0;
let numSorted = 0;
let sortedArray = [];
const container = document.querySelector(".container");
for (let i = 1; i <= 105; i++) {
	const cover = document.createElement("div");
	cover.className = "cover";
	const card = document.createElement("div");
	card.className = "card center";
	card.draggable = false;
	let num = Math.floor(Math.random() * 10) + 1;
	card.innerHTML = num;
	sortedArray.push(num);
	cover.append(card);
	container.append(cover);
}
sortedArray.sort((a, b) => {
	return a - b;
});
console.log(sortedArray);
let current;
let currParent;
let cards = document.querySelectorAll(".card");
const covers = document.querySelectorAll(".cover");

for (const card of cards) {
	card.addEventListener("dragstart", () => {
		current = card;
		currParent = card.parentNode;
		card.style.opacity = 0.5;
		numDrag++;
	});
	card.addEventListener("dragend", () => {
		card.style.opacity = 1;
	});
}
for (let cover of covers) {
	cover.addEventListener("dragenter", (e) => {
		e.preventDefault();
		cover.style.border = "0.01px solid gray";
	});
	cover.addEventListener("dragleave", () => {
		cover.style.border = "none";
	});
	cover.addEventListener("dragover", (e) => {
		e.preventDefault();
	});
	cover.addEventListener("drop", () => {
		currParent.append(cover.firstChild);
		cover.innerHTML = "";
		cover.append(current);
		cover.style.border = "none";
	});
}
const nav = document.querySelector(".nav");
const theme = document.querySelector(".theme");
const start = document.querySelector(".start");
const timer = document.querySelector(".timer");
theme.onclick = () => {
	for (let card of cards) {
		card.classList.toggle("light-card");
	}
	for (let cover of covers) {
		cover.classList.toggle("light-cover");
	}
	container.classList.toggle("light-container");
	start.classList.toggle("light-nav");
	theme.classList.toggle("light-nav");
	timer.classList.toggle("light-nav");
};

start.onclick = () => {
	start.disabled = true;
	sortedArray = [];
	for (let card of cards) {
		card.draggable = true;
		let num = Math.floor(Math.random() * 10) + 1;
		card.innerHTML = num;
		sortedArray.push(num);
	}
	sortedArray.sort((a, b) => {
		return a - b;
	});
	seconds = 0;
	let index = 0;
	let moveAhead = true;
	const id = setInterval(() => {
		if (seconds === 59) {
			cards = document.querySelectorAll(".card");
			for (let card of cards) {
				card.draggable = false;
				if (parseInt(card.innerText) === sortedArray[index] && moveAhead) {
					numSorted++;
				} else {
					moveAhead = false;
				}
				index++;
			}
			timer.innerText = `You have sorted ${numSorted} numbers in ${seconds} seconds and in a total of ${numDrag} drags.`;
			start.disabled = false;
			clearInterval(id);
		} else {
			timer.innerText = seconds + " seconds";
			seconds++;
		}
	}, 1000);
};
