const colors = ["#303030", "#01579B","#006064","#304FFE","#004D40"];
const images = ["http://flourishconf.com/2019/assets/images/tagline.png","http://flourishconf.com/2019/assets/images/logo.png","https://acm.cs.uic.edu/wiki/_media/logos:website-logo-replacement-2017.png", "https://lug.cs.uic.edu/LUG_logo_Non-UIC.png"];
const city = 12778674;
let counter = 0;

function getApiData(){
	let xhr = new XMLHttpRequest();
	let url = "http://localhost:8080/api/all?bus=6700,6627,307,332,4640,14487,6347,206&train=40350&city=chicago";

	xhr.open("GET",url,true);
	xhr.send(); 
	let busData = [];
	let trainData = [];
	let weatherData = [];
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){ 
			let data = JSON.parse(xhr.responseText);
			busData = data.Bus;
			trainData = data.Train;
			weatherData = data.Weather;
			document.querySelector("#bus").innerHTML = "";
			for(let i=0;i<busData.length;i++){
				// console.log(busData[i][0].tmstmp);
				let timeNow = new Date();
				let eta;
				for(let j=0;j<busData[i].length;j++)
				{
					eta = Math.abs((busData[i][j].prdtm.replace(":","")) - (addZero(timeNow.getHours()) +""+ addZero(timeNow.getMinutes())));
					document.querySelector("#bus").innerHTML += busData[i][j].route + " " + busData[i][j].dir + " in " + eta + " min<br>";
				}
				// console.log(eta);
			}
            
			document.querySelector("#weather-condition").innerHTML = weatherData[0][0].forecast.main[0];
			document.querySelector("#weather-temperature").innerHTML = "Feels Like<br>" + weatherData[0][0].temp + "K";
		}
	};
	setTimeout(getApiData,3000);
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

// function fadeIn(el){
//     el.style.opacity = 0;
//     (function fade() {
//         var val = parseFloat(el.style.opacity);
//         if (!((val += .1) > 1)) {
//             el.style.opacity = val;
//             setTimeout(fade, 40);
//         } 
//     })();
// }

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

// function cycleImages() {
//     fadeIn(document.querySelector("#message>img"));
//     document.querySelector("#message>img").src = images[counter%images.length];
//     counter++;
//     setTimeout(cycleImages,20000)
// }

function colorChanger(){
	document.body.style.backgroundColor = colors[getRandomInt(colors.length)];
	setTimeout(colorChanger, 10000);
}

// cycleImages();
colorChanger();
getApiData();


