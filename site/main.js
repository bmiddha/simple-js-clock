const colors = ["#303030", "#01579B", "#006064", "#304FFE", "#004D40"];
const busStops = ["6700", "6627", "307", "332", "4640", "14487", "6347", "206"];
const trainStations = ["40350"];
const city = "Chicago";

function getApiData(type, arg, value) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		let url = "http://localhost:8080/api/" + type + "/?" + arg + "=" + value;
		xhr.open("GET", url, true);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				let data = JSON.parse(xhr.responseText);
				resolve(data);
			}
		};
	});
}

function startTime() {
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let today = new Date();
	let hour = today.getHours();
	let min = today.getMinutes();
	let sec = today.getSeconds();
	let date = today.getDate();
	let month = today.getMonth() + 1;
	let year = today.getFullYear();
	let day = days[today.getDay()];
	hour = (hour > 12) ? (hour - 12) : hour;
	min = addZero(min);
	sec = addZero(sec);
	hour = addZero(hour);
	date = addZero(date);
	month = addZero(month);
	document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
	document.getElementById("date").innerHTML = day + "," + month + "/" + date + "/" + year;
	setTimeout(startTime, 500);
}

function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}


function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function colorChanger() {
	document.body.style.backgroundColor = colors[getRandomInt(colors.length)];
	setTimeout(colorChanger, 10000);
}

function getData() {
	document.querySelector("#bus").innerHTML = "";
	getApiData("bus", "bus", busStops.join(",")).then((result) => {
		let timeNow = new Date();
		for (let i=0;i<result.prd.length;i++) {
			let eta = Math.abs((result.prd[i].prdtm.split(" ")[1].replace(":","")) - (addZero(timeNow.getHours()) + "" + addZero(timeNow.getMinutes())));
			document.querySelector("#bus").innerHTML += " " + result.prd[i].rt + " " + result.prd[i].rtdir + " " + result.prd[i].prdtm.split(" ")[1] + "<br>";
		}
	});
	document.querySelector("#train").innerHTML = "";
	for (let i = 0; i < trainStations.length; i++) {
		getApiData("train", "train", trainStations[i]).then((result) => {
			let timeNow = new Date();
			for(let j = 0;j<result.ctatt.eta.length;j++) {
				let eta = result.ctatt.eta[j].arrT;
				document.querySelector("#train").innerHTML += result.ctatt.eta[j].rt + " " + result.ctatt.eta[j].stpDe + " " + result.ctatt.eta[j].arrT + "<br>";
			}
		});
	}
	getApiData("weather", "city", city).then((result) => {
		let temp = result.main.temp;
		let tempF = Math.round(result.main.temp * 9 / 5 - 459.67);
		let tempC = Math.round(result.main.temp - 273.15);
		document.querySelector("#weather-condition").innerHTML = result.weather[0].main;
		document.querySelector("#weather-temperature").innerHTML = tempF + "&#176;F | " + tempC + "&#176;C";
	});
	setTimeout(getData, 120000);
}

colorChanger();
getData();