require("dotenv").config();
const http = require("http");
const express = require("express");
const path = require("path");

const trainApiKey = process.env.CTA_TRAIN_API_KEY;
const busApiKey = process.env.CTA_BUS_API_KEY;
const openWeatherApiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

function getFromUrl(url) {
	return new Promise( (resolve, reject) => {
		http.request(url, (response) => {
			var str = "";
			response.on("data", (chunk) => {
				str += chunk;
			});
			response.on("end", () => {
				resolve(str);
			});
		}).end();
	});

}

const busKey = "Bus";
const trainKey = "Train";
const weatherKey = "Weather";
const o = {};
o[busKey] = [];
o[trainKey] = [];
o[weatherKey] = [];

let busStops = [ "6700" , "6627", "307", "332", "4640", "14487", "6347", "206"];
let trainStations = ["40350"];
let location = "Chicago";

function getBus() {
	for (let i=0;i<busStops.length;i++) {
		let busUrl="http://ctabustracker.com/bustime/api/v2/getpredictions?key="+busApiKey+"&stpid="+busStops[i]+"&format=json";
		let busRoute = [];
		let busStopName = [];
		let busDirection = [];
		let busPredictedTime = [];
		let busTimeStamp = [];
		let busExport = [];
		getFromUrl(busUrl).then((result) => {
			let busJson = JSON.parse(result)["bustime-response"];
			if (busJson.hasOwnProperty("error")) {
				// TODO
				console.log("Error response on bus " + busStops[i]);
				return;
			}
			for (let j=0;j<busJson["prd"].length;j++) {
				busRoute[j] = busJson["prd"][j]["rt"];
				busStopName[j] = busJson["prd"][j]["stpnm"];
				busDirection[j] = busJson["prd"][j]["rtdir"]; 
				busPredictedTime[j] = busJson["prd"][j]["prdtm"].split(" ")[1];
				busTimeStamp[j] = busJson["prd"][j]["tmstmp"].split(" ")[1];
				let data = {
					stop: busStopName[j],
					route: busRoute[j],
					dir: busDirection[j],
					prdtm: busPredictedTime[j],
					tmstmp: busTimeStamp[j],
				};
				busExport.push(data);
			}
			o[busKey].push(busExport);
        
		});
	}
}

function getTrain() {
	for (let i=0;i<trainStations.length;i++) {    
		let trainUrl="http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key="+trainApiKey+"&mapid="+trainStations[i]+"&max=5&outputType=JSON";
		let trainExport = [];  
		getFromUrl(trainUrl).then((result) => {
			let trainJson = JSON.parse(result);
			let trainRoute = [];
			let trainStationName = [];
			let trainDestination = [];
			let trainTimeStamp = [];
			let trainPrdictedTime = [];
			for (i=0;i<trainJson["ctatt"]["eta"].length;i++) {
				trainRoute[i] = trainJson["ctatt"]["eta"][i]["rt"];
				trainStationName[i] = trainJson["ctatt"]["eta"][i]["staNm"];
				trainDestination[i] = trainJson["ctatt"]["eta"][i]["stpDe"].split(" ")[2];
				trainTimeStamp[i] = trainJson["ctatt"]["eta"][i]["prdt"].split("T")[1];
				trainPrdictedTime[i] = trainJson["ctatt"]["eta"][i]["arrT"].split("T")[1];
				let data = {
					stop: trainStationName[i],
					route: trainRoute[i],
					dir: trainDestination[i],
					prdtm: trainPrdictedTime[i],
					tmstmp: trainTimeStamp[i],
				};
				trainExport.push(data);
			}
			o[trainKey].push(trainExport);
		});
	}
}

function getWeather() {
	var weatherUrl="http://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+openWeatherApiKey;
	var weatherExport = [];
	getFromUrl(weatherUrl).then((result) => {
		let weatherJson = JSON.parse(result);
		let weatherCity = weatherJson["name"] + ", " + weatherJson["sys"]["country"];
		let weatherWind = weatherJson["wind"];
		let weatherTemp = weatherJson["main"]["temp"];
		let weatherForecast = [];
		let weatherForecastDescription = [];
		for (let i=0; i<weatherJson["weather"].length;i++) {
			weatherForecast[i] = weatherJson["weather"][i]["main"];
			weatherForecastDescription[i] = weatherJson["weather"][i]["description"];
		}
		let data = {
			location: weatherCity,
			temp: weatherTemp,
			wind: weatherWind,
			forecast: {
				main: weatherForecast,
				description: weatherForecastDescription,
			},
		};
		weatherExport.push(data);
	});
	o[weatherKey].push(weatherExport);
}

const app = express();
const port = 8080;

app.listen(port);

function getData() {
	console.log("getting new data");
	getBus();
	getTrain();
	getWeather();
	setTimeout(() => {
		o[busKey] = [];
		o[trainKey] = [];
		o[weatherKey] = [];
		getData();
	}, 10000);
}

getData();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get("/api/all", function(req, res) {
	let bus = req.query.bus;
	let train = req.query.train;
	let city = req.query.city;
	busStops = bus.split(",");
	trainStations = train.split(",") ;
	location = city;
	res.send(o);
});

app.get("/api/bus", function(req, res) {
	let bus = req.query.bus;
	busStops = bus.split(",");
	res.send(o[busKey]);
});
app.get("/api/train", function(req, res) {
	let train = req.query.train;
	trainStations = train.split(",");
	res.send(o[trainKey]);
});
app.get("/api/weather", function(req, res) {
	let city = req.query.city;
	location = city;
	res.send(o[weatherKey]);
});

app.use(express.static(path.join(__dirname + "/site")));

// bus     : http://localhost:8080/api/bus?bus=6700,6627,307,332,4640,14487,6347,206
// train   : http://localhost:8080/api/train?train=40350
// weather : http://localhost:8080/api/weather?city=chicago
// all     : http://localhost:8080/api/all?bus=6700,6627,307,332,4640,14487,6347,206&train=40350&city=chicago
