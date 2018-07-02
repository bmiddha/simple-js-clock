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
				let data;
				if (xhr.responseText) {
					try {
						data = JSON.parse(xhr.responseText);
					}
					catch (e) {
						console.log(e);
					}
				}
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

function getData() {
	document.querySelector("#bus").innerHTML = "";
	getApiData("bus", "bus", busStops.join(",")).then((result) => {
		let timeNow = new Date();
		for (let i=0;i<result["bustime-response"].prd.length;i++) {
			let timeFromApi = result["bustime-response"].prd[i].prdtm;
			let prdTime = new Date(timeFromApi.slice(0,4)+"/"+timeFromApi.slice(4,6)+"/"+timeFromApi.slice(6,16));
			let eta = Math.floor(Math.abs(prdTime - timeNow)/1000/60);
			document.querySelector("#bus").innerHTML += "<li><i class='fa fa-bus'></i><span class=route>" + result["bustime-response"].prd[i].rt + "</span><span class=direction>" + result["bustime-response"].prd[i].rtdir + "</span><span class=eta>" + eta + " min</span></li>";
			// let arrivalTime = addZero(((prdTime.getHours() > 12 ) ? (prdTime.getHours() - 12) : prdTime.getHours())) + ":" + addZero(prdTime.getMinutes());
			// document.querySelector("#bus").innerHTML += "<li><i class='fa fa-bus'></i><span class=route>" + result["bustime-response"].prd[i].rt + "</span><span class=direction>" + result["bustime-response"].prd[i].rtdir + "</span><span class=eta>" + arrivalTime + "</span></li>";
		}
	});
	document.querySelector("#train").innerHTML = "";
	for (let i = 0; i < trainStations.length; i++) {
		getApiData("train", "train", trainStations[i]).then((result) => {
			let timeNow = new Date();
			for(let j = 0;j<result.ctatt.eta.length;j++) {
				let prdTime = new Date(result.ctatt.eta[j].arrT);
				let eta = Math.floor(Math.abs(prdTime - timeNow)/1000/60);
				document.querySelector("#train").innerHTML += "<li><i class='fa fa-train'></i><span class=route>" + result.ctatt.eta[j].rt + "</span><span class=direction>" + result.ctatt.eta[j].destNm + "</span><span class=eta>" + eta + " min<span></li>";
				// let arrivalTime = addZero(((prdTime.getHours() > 12 ) ? (prdTime.getHours() - 12) : prdTime.getHours())) + ":" + addZero(prdTime.getMinutes());
				// document.querySelector("#train").innerHTML += "<li><i class='fa fa-train'></i><span class=route>" + result.ctatt.eta[j].rt + "</span><span class=direction>" + result.ctatt.eta[j].destNm + "</span><span class=eta>" + arrivalTime + "</span></li>";
			}
		});
	}
	getApiData("weather", "city", city).then((result) => {
		let temp = result.main.temp;
		let tempF = Math.round(temp * 9 / 5 - 459.67);
		let tempC = Math.round(temp - 273.15);
		let timeNow = new Date();
		let dayNight = (timeNow.getHours() >= 22 || timeNow.getHours() <= 4) ? "n" : "d";
		document.querySelector('#weather-icon').className = "owf owf-" + result.weather[0].id + "-" + dayNight;
		document.querySelector("#weather-condition").innerHTML = result.weather[0].main;
		document.querySelector("#weather-temperature").innerHTML = tempF + "&#176;F<br>" + tempC + "&#176;C";
		// setTimeout(updateEta, 1000);
	});
	setTimeout(getData, 60000);
}

function updateEta() {
	console.log("updating eta");
	let time = document.querySelectorAll("li>.eta");
	let timeNow = new Date();
	console.log(timeNow);
	for (let i = 0; i < time.length; i++) {
		let arrival = time[i].innerHTML;
		let eta = parseInt( arrival.split(':')[0] + arrival.split(':')[1]) - parseInt(addZero(timeNow.getHours())+ "" +addZero(timeNow.getMinutes()));
		time[i].innerHTML = eta + " min";
		console.log(arrival, eta);
	}
	setTimeout(updateEta, 60000);
}

getData();
