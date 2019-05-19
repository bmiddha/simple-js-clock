import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

function getCtaBus(busStop: string): Promise<{}> {
    return new Promise((resolve, reject): void => {
        const url = "http://ctabustracker.com/bustime/api/v2/getpredictions?key=" + process.env.CTA_BUS_API_KEY + "&stpid=" + busStop + "&format=json";
        fetch(url).then((res): {} => res.json()).then((result: {}): void => resolve(result))
            .catch((err): void => reject(err));
    });
}

export default getCtaBus;