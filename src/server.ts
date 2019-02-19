import * as dotenv from 'dotenv';
import * as http from 'http';
import * as express from 'express';

dotenv.config();

const trainApiKey = process.env.CTA_TRAIN_API_KEY;
const busApiKey = process.env.CTA_BUS_API_KEY;
const openWeatherApiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
const app = express();
const port = 8080;

app.listen(port);

console.log("Server started on port " + port);

function getFromUrl(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
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

function getCtaBus(busStop: string): Promise<any> {
    return new Promise((resolve, reject) => {
        let busUrl = "http://ctabustracker.com/bustime/api/v2/getpredictions?key=" + busApiKey + "&stpid=" + busStop + "&format=json";
        getFromUrl(busUrl).then((result) => {
            let busJson = JSON.parse(result);
            if (busJson.hasOwnProperty("error")) {
                resolve("Error response on bus stop " + busStop);
            }
            resolve(busJson);
        });
    });
}

function getCtaTrain(trainStation: string): Promise<any> {
    return new Promise((resolve, reject) => {
        let trainUrl = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=" + trainApiKey + "&mapid=" + trainStation + "&max=5&outputType=JSON";
        getFromUrl(trainUrl).then((result) => {
            let trainJson = JSON.parse(result);
            if (trainJson.hasOwnProperty("error")) {
                resolve("Error response on train station " + trainStation);
            }
            resolve(trainJson);
        });
    });
}

function getWeather(city: string): Promise<any> {
    return new Promise((resolve, reject) => {
        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + openWeatherApiKey;
        getFromUrl(weatherUrl).then((result) => {
            let weatherJson = JSON.parse(result);
            resolve(weatherJson);
        });
    });
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/bus", (req, res) => {
    let bus = req.query.bus;
    getCtaBus(bus).then((result) => {
        res.send(result);
    });
});
app.get("/api/train", (req, res) => {
    let train = req.query.train;
    getCtaTrain(train).then((result) => {
        res.send(result);
    });
});
app.get("/api/weather", (req, res) => {
    let city = req.query.city;
    getWeather(city).then((result) => {
        res.send(result);
    });
});

app.use(express.static("public"));