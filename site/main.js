const colors = ["#303030", "#01579B","#006064","#304FFE","#004D40"];
const busStops = [ "6700" , "6627", "307", "332", "4640", "14487", "6347", "206"];
const trainStations = ["40350"];
const city = "Chicago";

function getApiData(type,arg,value) {
	return new Promise ((resolve,reject) => {
		let xhr = new XMLHttpRequest();
		let url = "http://localhost:8080/api/"+type+"/?"+arg+"="+value;
		xhr.open("GET",url,true);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){ 
				let data = JSON.parse(xhr.responseText);
				resolve (data);
			}
		};
	});
}

function startTime() {
	let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
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
	if (i < 10) {i = "0" + i;}
	return i;
}


function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function colorChanger(){
	document.body.style.backgroundColor = colors[getRandomInt(colors.length)];
	setTimeout(colorChanger, 10000);
}

function getData() {
	console.clear();
	for (let i = 0; i < busStops.length;i++) {
		let data = getApiData("bus","bus",busStops[i]).then((result)=>{
			console.log("BUS STOP: " + busStops[i], result);
		});
	}
	for (let i = 0; i < trainStations.length;i++) {
		let data = getApiData("train","train",trainStations[i]).then((result)=>{
			console.log("TRAIN STATION: " + trainStations[i], result);
		});
	}
	let data = getApiData("weather","city",city).then((result)=>{
		console.log("WEATHER: " + city, result);
	});
	setTimeout(getData,60000);
}

colorChanger();
getData();