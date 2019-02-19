import * as http from 'http';
import { config } from '../config';

const trainApiKey = config.ctaTrainApiKey;
const busApiKey = config.ctaBusApiKey;
const openWeatherApiKey = config.openWeatherMapKey;

export function getFromUrl(url: string): Promise<any> {
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

export function getCtaBus(busStop: string): Promise<any> {
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

export function getCtaTrain(trainStation: string): Promise<any> {
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

export function getWeather(city: string): Promise<any> {
    return new Promise((resolve, reject) => {
        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + openWeatherApiKey;
        getFromUrl(weatherUrl).then((result) => {
            let weatherJson = JSON.parse(result);
            resolve(weatherJson);
        });
    });
}