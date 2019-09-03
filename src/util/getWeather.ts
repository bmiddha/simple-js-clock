import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

function getWeather(weatherLatLong: string): Promise<{}> {
    return new Promise((resolve, reject): void => {
        const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${weatherLatLong}?exclude=minutely,hourly,daily,alerts,flags&units=si`;
        fetch(url).then((res): {} => res.json()).then((result: {}): void => resolve(result))
            .catch((err): void => reject(err));
    });
}

export default getWeather;