import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

function getWeather(city: string): Promise<{}> {
    return new Promise((resolve, reject): void => {
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + process.env.OPEN_WEATHER_MAP_API_KEY;
        fetch(url).then((res): {} => res.json()).then((result: {}): void => resolve(result))
            .catch((err): void => reject(err));
    });
}

export default getWeather;