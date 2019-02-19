import dotnev from "dotenv";
dotnev.config();

import getFromUrl from "./getFromUrl";

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
function getWeather(city: string): Promise<{}> {
    return new Promise((resolve, reject) => {
        const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + openWeatherApiKey;
        getFromUrl(weatherUrl).then((result) => {
            const weatherJson = JSON.parse(result);
            resolve(weatherJson);
        }).catch(err => reject(err));
    });
}

export default getWeather;