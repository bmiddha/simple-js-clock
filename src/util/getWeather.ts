import dotenv from "dotenv";
dotenv.config();

import getHttps from "./getHttps";

function getWeather(city: string): Promise<{}> {
    return new Promise((resolve, reject) => {
        const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + process.env.OPEN_WEATHER_API_KEY;
        getHttps(weatherUrl).then((result) => {
            const weatherJson = JSON.parse(result);
            resolve(weatherJson);
        }).catch(err => reject(err));
    });
}

export default getWeather;