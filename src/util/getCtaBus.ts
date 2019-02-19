import dotnev from "dotenv";
dotnev.config();

import getHttp from "./getHttp";

function getCtaBus(busStop: string): Promise<{}> {
    return new Promise((resolve, reject) => {
        const busUrl = "http://ctabustracker.com/bustime/api/v2/getpredictions?key=" + process.env.CTA_BUS_API_KEY + "&stpid=" + busStop + "&format=json";
        getHttp(busUrl).then((result) => {
            const busJson = JSON.parse(result);
            if (busJson.hasOwnProperty("error")) {
                reject("Error response on bus stop " + busStop);
            }
            resolve(busJson);
        }).catch(err => reject(err));
    });
}

export default getCtaBus;