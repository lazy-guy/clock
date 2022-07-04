if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("./sw.js");
}

let minutelines = document.getElementsByClassName("minuteline");

for (let i = 0; i < minutelines.length; i++) {
	let line = minutelines[i];
	line.style.transform = "rotate(" + 6 * i + "deg)";
}

let secondHand = document.getElementById("secondhand");
let minuteHand = document.getElementById("minutehand");
let hourHand = document.getElementById("hourhand");

let second = document.getElementById("second");
let minute = document.getElementById("minute");
let hour = document.getElementById("hour");
let ampm = document.getElementById("ampm");
let datespan = document.getElementById("date");
let t, phours, pseconds, pminutes;

function loop() {
	let date = new Date();
	let seconds = date.getSeconds();
	let minutes = date.getMinutes();
	let hours = date.getHours();
	secondHand.style.transform = "rotate(" + 6 * seconds + "deg)";
	minuteHand.style.transform =
		"rotate(" + 6 * (minutes + seconds / 60) + "deg)";
	hourHand.style.transform =
		"rotate(" +
		30 * ((hours % 12) + (minutes + seconds / 60) / 60) +
		"deg)";
	if (pseconds !== seconds) {
		second.innerText = seconds.toString().padStart(2, "0");
		pseconds = seconds;
	}
	if (pminutes !== minutes) {
		minute.innerText = minutes.toString().padStart(2, "0");
		pminutes = minutes;
	}
	if (phours !== hours) {
		hour.innerText = (hours % 12).toString().padStart(2, "0");
		phours = hours;
		ampm.innerText = Math.floor(hours / 12) ? "PM" : "AM";
	}

	let tnew = new Intl.DateTimeFormat(undefined, { dateStyle: "full" }).format(
		date
	);
	if (t !== tnew) {
		t = tnew;
		datespan.innerText = t;
	}

	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
clockType = "analog"
document.addEventListener("click", () => {
	clockType = clockType === "analog" ? "digital" : "analog"
	document.body.className = clockType
})